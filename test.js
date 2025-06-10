const a = Number('6gf')
if (isNaN(a)) {
  console.log(a)
}
function perevod(s) {
  let snew = ''
  for (const char of s ) {
    if (char === char.toUpperCase()) {
      snew += '_'
      snew += char.toLowerCase()
    } else {
      snew += char
    }
  }
  return snew
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
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this,args)
    else{
      return function(...args2) {
        return curried.apply(this, args.concat(args2))

      }
    }
  }
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
const timeLimited = function (fn, t) {
  return (...args) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject('TimeLimited')
    }, t)
    fn(...args)
      .then(result => {
        clearTimeout(timer)
        resolve(result)
      })
  })

}
