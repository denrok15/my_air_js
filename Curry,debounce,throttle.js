function sum(a, b, c) {
  return a + b + c
}

function x2(a, b) {
  return a + b
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}



function debounce(fn, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


function throttle(fn, delay) {
  let tastcall= 0
  return function(...args) {
    const now = new Date().getTime()
    if (now - tastcall >= delay) {
      fn.apply(this, args)
      tastcall = now
    }

  }
}
