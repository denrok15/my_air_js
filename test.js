const a = Number('6gf')
if (isNaN(a)) {
  console.log(a)
}

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(()=> {
      resolve()
    },duration)
  })
}
function joins(delimiter,...args) {
  return args.join(delimiter)
}
function joins2(delimiter) {
  return new Array(arguments).slice(1).join(delimiter)
}

function get(url,count = 5) {
  return fetch(url)
    .then(res => res.json())
    .catch(()=> {
      if (count > 0) return get(url,count - 1)
      else throw new Error('Expected')
    })
}

function memoize(fn) {
  const memo = new Map()
  return function(...args) {
    const hash = args.join('_')
    if (memo.has(hash)) return memo.get(hash)
    const value = fn(...args)
    memo.set(hash,value)
    return value
  }
}

