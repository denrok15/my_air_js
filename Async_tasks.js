//task 1
// number
// undefined
//  1
// true
// false
// start
// End
// Promise
// Timeout 1
// undefined

// task 3
function fetchWithRetryAndTimeout(url, count = 3) {
  const responce = fetch(url)
    .then(response => response.json())
    .catch(() => {
      if (count === 0) throw new Error('Request failed or timed out')
      else return fetchWithRetryAndTimeout(url, count - 1)
    })
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request failed or timed out'))
    }, 2000)
  })
  return Promise.race([responce, timeout])


}

//task 4



// task 5
async function validateall(url1, url2, value) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'))
    },1000)
  })
  const p1 = Promise.race([validate(url1, value), timeout])
  const p2 = Promise.race([validate(url2, value), timeout])
  try {
    const [res1, res2] = await Promise.all([p1, p2])
    if (res1 && res2) return 'success'
    if (!res1 || !res2) return 'failed'

  } catch(error) {
    if (error.message === 'Timeout') return 'timeout'
    else return 'error'

  }


}
