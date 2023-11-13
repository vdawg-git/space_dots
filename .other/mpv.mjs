import "zx/globals"

const params =
  "--slang=en no-audio  --sid=2 --sub-font='Arial Regular' --sub-border-size=1  --sub-shadow-color='#000000' --sub-shadow-offset=2 --sub-font-size=20 --sub-color=#FDDA0D --sub-bold --no-ass --sub-margin-y=40     --video-margin-ratio-top=0.15 --video-margin-ratio-bottom=0.15 --osd-on-seek=no"

/** @type {readonly [number, string, number][] } */
const playlist = [
  // Start
  [1, "02:40", 16],

  [2, "02:11", 25],

  // [1, "04:36", 13],

  [3, "18:36", 10],

  // End
  [1, "22:17", 19],
]

export async function startPlayback() {
  await playFirstVideo(...playlist[0])

  for (const [file, start, duration] of playlist.slice(1)) {
    await playVideo(file, start, duration)
  }
}

/**
 * Sets up the mpv IPC and plays a file
 * @param {number} file
 * @param {string} start
 * @param {number} duration in seconds
 */
async function playFirstVideo(file, start, duration) {
  const mpvParams = [
    "-o",
    params,
    `--start=${start}`,
    "input-ipc-server=/tmp/mpv-socket",
  ].join(" ")
  const filePath = `${os.homedir}/Downloads/${file}`

  const allParams = [mpvParams, "*", filePath]

  $`mpvpaper  ${allParams}`

  return sleep(duration * 1000)
}

/**
 * @param {number} file
 * @param {string} start
 * @param {number} duration in seconds
 */
async function playVideo(file, start, duration) {
  await $`echo 'loadfile "${os.homedir}/Downloads/${file}"' | socat - /tmp/mpv-socket`
  await sleep(50)
  await $`echo 'seek ${start} absolute' | socat - /tmp/mpv-socket`
  //   $`echo '{ "command": [ "seek", "${start}", "absolute" ] }' | socat - /tmp/mpv-socket`

  return sleep(duration * 1000)
}
