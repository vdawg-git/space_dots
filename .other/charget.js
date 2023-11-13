#!/usr/bin/env zx

const sentences = [
  "これはスペースキー",
  "ホレンソン ドゥー アモンガス",
]

console.log(getRandomFromArray(sentences))

function getRandomFromArray(array) {
  return array.at(Math.floor(Math.random() * array.length))
}

// const chars =
//   "*-_─ ━  ╲ ╳ ╴ ';:'╵ ╶ ╷ ╸ ╹ ╺ ╻ ╼ ╽ ╾ ╿ 暗闇で抱きしめてくれた人、笑わせてくれた人、一晩中話をしてくれた人、車でお見舞いに来てくれた人、一緒に泣いてくれた人、x病院で一緒にいてくれた人、いつもあなたのことを一番に考えてくれた人、運んでくれた人、寂しいと言ってくれた人、そんな人たちを思い出してください。 このような人々が、あなたの生活の中の小さな暖かさ、あなたを暗い気持ちにさせない暖かさ、あなたを優しい人にしてくれる暖かさを作り上げているのです ."
//     .split("")
//     .map((char) => ({ char, sort: Math.random() }))
//     .sort(({ sort: a }, { sort: b }) => b - a)
//     .map(({ char }) => char)
//     .slice(0, 24)
//     .map((char, index, array) =>
//       Math.random() > 0.8 &&
//       array[index - 1] !== "/" &&
//       array[index - 1] !== " " &&
//       array[index + 1] !== "/" &&
//       index !== 0
//         ? "/"
//         : char
//     )
//     .map((char, index, array) =>
//       Math.random() > 0.9 &&
//       array[index - 1] !== "|" &&
//       array[index + 1] !== "|" &&
//       index - 1 !== array.length
//         ? " | "
//         : char
//     )
//     .join("")
