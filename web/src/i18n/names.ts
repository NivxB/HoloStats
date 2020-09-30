import { InjectionToken } from "@angular/core";

import { vtubers, batches } from "vtubers";

export type LocalNames = Record<
  keyof typeof vtubers | keyof typeof batches,
  string
>;

export const LOCAL_NAMES = new InjectionToken<LocalNames>("local-names");

export const localNamesFactory = (): LocalNames => ({
  // vtubers
  hololive: $localize`:@@hololive:`,
  sora: $localize`:@@sora:`,
  roboco: $localize`:@@roboco:`,
  miko: $localize`:@@miko:`,
  suisei: $localize`:@@suisei:`,
  fubuki: $localize`:@@fubuki:`,
  matsuri: $localize`:@@matsuri:`,
  haato: $localize`:@@haato:`,
  aki: $localize`:@@aki:`,
  mel: $localize`:@@mel:`,
  choco: $localize`:@@choco:`,
  choco_alt: $localize`:@@choco_alt:`,
  shion: $localize`:@@shion:`,
  aqua: $localize`:@@aqua:`,
  subaru: $localize`:@@subaru:`,
  ayame: $localize`:@@ayame:`,
  pekora: $localize`:@@pekora:`,
  rushia: $localize`:@@rushia:`,
  flare: $localize`:@@flare:`,
  marine: $localize`:@@marine:`,
  noel: $localize`:@@noel:`,
  kanata: $localize`:@@kanata:`,
  coco: $localize`:@@coco:`,
  watame: $localize`:@@watame:`,
  towa: $localize`:@@towa:`,
  himemoriluna: $localize`:@@himemoriluna:`,
  lamy: $localize`:@@lamy:`,
  nene: $localize`:@@nene:`,
  botan: $localize`:@@botan:`,
  polka: $localize`:@@polka:`,
  mio: $localize`:@@mio:`,
  okayu: $localize`:@@okayu:`,
  korone: $localize`:@@korone:`,
  azki: $localize`:@@azki:`,
  yogiri: $localize`:@@yogiri:`,
  civia: $localize`:@@civia:`,
  echo: $localize`:@@echo:`,
  doris: $localize`:@@doris:`,
  artia: $localize`:@@artia:`,
  rosalyn: $localize`:@@rosalyn:`,
  risu: $localize`:@@risu:`,
  moona: $localize`:@@moona:`,
  iofi: $localize`:@@iofi:`,
  amelia: $localize`:@@amelia:`,
  calliope: $localize`:@@calliope:`,
  gura: $localize`:@@gura:`,
  inanis: $localize`:@@inanis:`,
  kiara: $localize`:@@kiara:`,
  luna: $localize`:@@luna:`,
  nekomiya: $localize`:@@nekomiya:`,
  tamaki: $localize`:@@tamaki:`,
  pph: $localize`:@@pph:`,
  nana: $localize`:@@nana:`,
  ui: $localize`:@@ui:`,
  miyabi: $localize`:@@miyabi:`,
  kira: $localize`:@@kira:`,
  izuru: $localize`:@@izuru:`,
  aruran: $localize`:@@aruran:`,
  rikka: $localize`:@@rikka:`,
  astel: $localize`:@@astel:`,
  temma: $localize`:@@temma:`,
  roberu: $localize`:@@roberu:`,
  shien: $localize`:@@shien:`,
  oga: $localize`:@@oga:`,
  // batches
  hololive_og: $localize`:@@hololive_og:`,
  hololive_1st: $localize`:@@hololive_1st:`,
  hololive_2nd: $localize`:@@hololive_2nd:`,
  hololive_3rd: $localize`:@@hololive_3rd:`,
  hololive_4th: $localize`:@@hololive_4th:`,
  hololive_5th: $localize`:@@hololive_5th:`,
  hololive_gamers: $localize`:@@hololive_gamers:`,
  innk_music: $localize`:@@innk_music:`,
  hololive_cn_1st: $localize`:@@hololive_cn_1st:`,
  hololive_cn_2nd: $localize`:@@hololive_cn_2nd:`,
  hololive_id: $localize`:@@hololive_id:`,
  hololive_en: $localize`:@@hololive_en:`,
  holostars_1st: $localize`:@@holostars_1st:`,
  holostars_2nd: $localize`:@@holostars_2nd:`,
  holostars_3rd: $localize`:@@holostars_3rd:`,
  others: $localize`:@@others:`,
});
