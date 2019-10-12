import { Pipe, PipeTransform } from "@angular/core";
import { formatDistanceStrict } from "date-fns";
import { zhTW } from "date-fns/locale";

@Pipe({ name: "distance" })
export class DistancePipe implements PipeTransform {
  transform(start: Date | null, end: Date): string {
    return end
      ? formatDistanceStrict(end, start, {
          locale: zhTW
        }) + "前"
      : "";
  }
}