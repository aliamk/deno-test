/* function a() {
  console.log('THIS IS A TEST')
}

a()*/

// const food = 'love'

const food = Deno.args[0]
// const mood = Deno.args[0]
const parent = Deno.args[1]

if (food === 'love' && parent === 'ryan') {
  console.log('🦕 ...Deno1 is born!')
} else {
  console.log('🥚 ...this egg1 needs some love')
}

// if (mood === 'happy') {
//   console.log('🦕 ...Deno2 is born!')
// } else {
//   console.log('🥚 ...this egg2 needs some love')
// }