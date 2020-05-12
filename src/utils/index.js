export function add(component) {
  console.log(`add ${component}`)
}

export function remove(component) {
  console.log(`remove ${component}`)
}

export function testBabel() {
  const a = [1, 2, 3]
  return [...a].map((n) => n + 1)
}

export async function testAsync() {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('async function')
    }, 1000)
  }).then(res => {
    console.log(res)
  })
}
