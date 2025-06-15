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
    }, 1000)
  })
  const p1 = Promise.race([validate(url1, value), timeout])
  const p2 = Promise.race([validate(url2, value), timeout])
  try {
    const [res1, res2] = await Promise.all([p1, p2])
    if (res1 && res2) return 'success'
    if (!res1 || !res2) return 'failed'

  } catch (error) {
    if (error.message === 'Timeout') return 'timeout'
    else return 'error'

  }
}

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const errors = [];

    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          errors.push(error);
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

function createRenderer(delay, renderChar) {
  const queue = [];
  let head = 0;
  let timer = null;

  function startRendering() {
    if (timer !== null) return;

    timer = setInterval(() => {
      if (head >= queue.length) {
        clearInterval(timer);
        timer = null;
        queue.length = 0;
        head = 0;
        return;
      }
      renderChar(queue[head]);
      head++;
    }, delay);
  }

  return function renderMessage(message) {
    for (let i = 0; i < message.length; i++) {
      queue.push(message[i]);
    }
    startRendering();
  };
}


const render = createRenderer(100, (char) => {
  console.log(`${Date.now() - start}ms:`, char);
});

const start = Date.now();

render("ab");        // Вводится в момент 0мс
render("cd");        // Тут же, сразу после
setTimeout(() => {
  render("ef");      // Через 150мс после начала
}, 150);

function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    const result = []
    let completed = 0
    for (let i = 0; i < promises.length; i += 1) {
      Promise.resolve(promises[i])
        .then((data) => result[i] = {status: 'fulfil',value: data})
        .catch((error) => result[i] = {status: 'rejected', error: error})
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(result)
          }

        })
    }

  })
}
