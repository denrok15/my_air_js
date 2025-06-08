
function get(url, count = 5) {
  return fetch(url)
    .then(res => res.json())
    .catch(() => {
      if (count > 0) {
        return get(url, count - 1)
      } else {
        throw new Error('Count limit')
      }

    })

}

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


function ispangram(text) {
  const chars = new Set()
  for (const char of text.toUpperCase()) {
    if (letters.includes(char)) {
      chars.add(char)

    }
  }
  return chars.size === 26
}













import {checkresult} from 'mylib'

const solution = 'Any answer'
const url1 = 'yandex.ru'
const url2 = 'google.com'
const f1 = checkresult(url1, solution)
const f2 = checkresult(url2, solution)

function check(fn1, fn2) {
  const timer = new Promise((_, reject) => {
    setTimeout(() => {
      reject('timeout')
    },1000)
  })
  const promise1 = Promise.race([fn1,timer])
  const promise2 = Promise.race([fn2,timer])
  return Promise.all([promise1,promise2])
    .then(([value1,value2])=> {
      if (value1 && value2) {
        return 'success'
      } else {
        return 'fail'
      }
    })
    .catch((error) => {
      if (error !== 'timeout') {
        return 'error'
      } else {
        return 'timeout'
      }
    })

}
function fecthwithTimeout(url, ms) {
  const responce = fetch(url)
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error('Timeout'), ms)
      },
    )
  })
  return Promise.race([responce, timeout])
}
