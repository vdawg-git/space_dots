#!/usr/bin/env zx

import "zx/globals"
import sa from "shell-artist"
import figlet from "figlet"
import anim from "chalk-animation"
import { startPlayback } from "./mpv.mjs"

$.verbose = false

$`clear`

const intro = anim.karaoke(
  figlet.textSync("Time to Rice", {
    font: "DOS Rebel",
    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: true,
    width: 80,
  }),
  3
)

await sleep(1320).then(() => intro.stop())

$`cvlc /home/vdawg/Downloads/vinyl`
const vibes = sa.start("Init the vibes...", { modifier: "bold" })
await sleep(850)
sa.stop(vibes, "Starting vibes", { modifier: "bold" })
await sleep(800)

const ui = sa.start("Starting UI...")
$`waybar`.quiet()
await sleep(1800)
sa.stop(ui, "[ ✓ ] UI started", {
  modifier: "bold",
  color: "yellow",
})
await sleep(100)
const audio = sa.start("Getting blues...")
$`cvlc --start-time=179 ~/Downloads/m`
await sleep(1800)
sa.stop(audio, "[ ✓ ] Audatitive vibes", {
  modifier: "bold",
  color: "blueBright",
})
await sleep(100)

const video = sa.start("Bringing visuals...")
startPlayback()
await sleep(1800)
sa.stop(video, "[ ✓ ] Visual vibes", {
  modifier: "bold",
  color: "green",
})
await sleep(800)
sa.log("-- Lets go")
await sleep(400)

// await $`chafa -c 16 --color-space din99d --symbols -dot-stipple -f symbols gooo.png`.pipe(
//   process.stdout
// )

