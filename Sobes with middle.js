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

const timelimited2 = function (fn, t) {
  return (...args) => {
    let timeoutid
    const timer = new Promise((_, reject) => {
      timeoutid = setTimeout(() => {
        reject('TimeLimited')
      }, t)

    })
    const promise1 = fn(...args).finally(() => clearTimeout(timeoutid))
    return Promise.race([timer, promise1])
  }


}
