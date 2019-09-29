mod consts;
mod types;
mod utils;

use chrono::{Timelike, Utc};
use consts::VTUBERS;
use futures::future::try_join_all;
use isahc::{config::RedirectPolicy, HttpClient};
use std::str::FromStr;
use std::time::Duration;

use crate::types::{Error, Result, Values};
use crate::utils::{
    current_streams, patch_values, stream_stats, youtube_first_video, youtube_videos_snippet, Auth,
};

#[tokio::main]
async fn main() -> Result<()> {
    let client = HttpClient::builder()
        .redirect_policy(RedirectPolicy::Follow)
        .tcp_keepalive(Duration::from_secs(5))
        .build()?;

    let auth = Auth::new(&client).await?;

    let now = Utc::now();
    let now_str = now.timestamp().to_string();

    let videos_id = try_join_all(
        VTUBERS
            .iter()
            .filter(|v| !v.youtube.is_empty())
            .map(|v| youtube_first_video(&client, v.youtube, &now_str)),
    )
    .await?
    .join(",");

    let mut values = Values::default();
    values.insert("/updatedAt/streamList", now);

    let videos = if now.hour() % 2 == 0 {
        youtube_videos_snippet(&client, &videos_id, env!("YOUTUBE_API_KEY0")).await?
    } else {
        youtube_videos_snippet(&client, &videos_id, env!("YOUTUBE_API_KEY1")).await?
    };

    for video in videos {
        if let Some(details) = video.live_streaming_details {
            if details.actual_end_time.is_some() {
                continue;
            } else if let Some(start) = details.actual_start_time {
                values.insert(format!("/streams/_current/{}", video.id), true);

                if let Some(snippet) = video.snippet {
                    let vtuber = VTUBERS
                        .iter()
                        .find(|v| v.youtube == snippet.channel_id)
                        .unwrap();
                    values.insert(format!("/streams/{}/vtuberId", video.id), vtuber.name);
                    values.insert(format!("/streams/{}/title", video.id), snippet.title);
                }

                if let Some(current) = details.concurrent_viewers {
                    let current = usize::from_str(&current)?;
                    values.insert(format!("/streamStats/{}/{}", video.id, now_str), current);
                }

                values.insert(format!("/streams/{}/start", video.id), start);
                values.insert(format!("/streams/{}/id", video.id), video.id);
            }
        }
    }

    patch_values(&client, &auth.id_token, values).await?;

    let current = match current_streams(&client, &auth.id_token).await {
        Ok(current) => current,
        Err(Error::Json(_)) => return Ok(()),
        Err(e) => return Err(e),
    };

    let mut values = Values::default();

    for (key, _) in current.iter().filter(|&(_, v)| !v) {
        values.insert(format!("/streams/_current/{}", key), ());
    }

    let stats = try_join_all(
        current
            .keys()
            .map(|id| stream_stats(&client, &auth.id_token, id)),
    )
    .await?;

    for (id, stat) in current.keys().zip(stats.iter()) {
        if let Some(stat) = stat {
            values.insert(
                format!("/streams/{}/maxViewers", id),
                *(stat.iter().max().unwrap()),
            );
            values.insert(
                format!("/streams/{}/avgViewers", id),
                stat.iter().sum::<usize>() / stat.len(),
            );
        }
    }

    patch_values(&client, &auth.id_token, values).await?;

    Ok(())
}
