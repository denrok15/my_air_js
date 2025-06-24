// ===== Task 1: Порядок вывода в Event Loop =====
// Условие: Предсказать порядок вывода console.log
// Подход: 
// 1. Синхронный код выполняется первым
// 2. Микрозадачи (promise) выполняются перед макрозадачами (setTimeout)
// 3. Очередь макрозадач выполняется после микрозадач
// Вывод: number, undefined, 1, true, false, start, End, Promise, Timeout 1, undefined

// ===== Task 3: Fetch с повторными попытками и таймаутом =====
// Условие: Реализовать fetch с повторными попытками и общим таймаутом
// Подход:
// 1. Рекурсивный вызов при ошибках (до count попыток)
// 2. Promise.race для добавления таймаута
// Сложность: O(n) где n - количество попыток
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

// ===== Task 5: Валидация с таймаутом =====
// Условие: Проверить валидацию по двум URL с общим таймаутом
// Подход:
// 1. Promise.race для каждого запроса с таймаутом
// 2. Promise.all для ожидания обоих результатов
// Сложность: O(1) - фиксированное количество запросов
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

// ===== Promise.any полифилл =====
// Условие: Реализовать аналог Promise.any
// Подход:
// 1. Отслеживаем отклоненные промисы
// 2. Возвращаем первый успешный или AggregateError
// Сложность: O(n) где n - количество промисов
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

// ===== Анимация сообщений =====
// Условие: Реализовать очередь анимированного вывода символов
// Подход:
// 1. Очередь символов и указатель на текущий
// 2. Интервал для последовательного вывода
// Сложность: O(n) где n - длина сообщения
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

// Пример использования анимации
const render = createRenderer(100, (char) => {
  console.log(`${Date.now() - start}ms:`, char);
});

const start = Date.now();
render("ab");        // Вводится в момент 0мс
render("cd");        // Тут же, сразу после
setTimeout(() => {
  render("ef");      // Через 150мс после начала
}, 150);

// ===== Promise.allSettled полифилл =====
// Условие: Реализовать аналог Promise.allSettled
// Подход:
// 1. Обрабатываем и успешные и неудачные промисы
// 2. Возвращаем массив с результатами всех промисов
// Сложность: O(n) где n - количество промисов
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    const result = []
    let completed = 0
    for (let i = 0; i < promises.length; i += 1) {
      Promise.resolve(promises[i])
        .then((data) => result[i] = {status: 'fulfilled', value: data})
        .catch((error) => result[i] = {status: 'rejected', reason: error})
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(result)
          }
        })
    }
  })
}

// ===== Ограничение времени выполнения функции =====
// Условие: Добавить таймаут выполнения асинхронной функции
// Подход:
// 1. Promise.race между функцией и таймером
// 2. Очистка таймера при успешном выполнении
// Сложность: O(1)
const timeLimited = function (fn, t) {
  return (...args) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject('Time Limited')
    }, t)
    fn(...args)
      .then(result => {
        clearTimeout(timer)
        resolve(result)
      })
      .catch(err => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

// Альтернативная реализация с finally
const timelimited2 = function (fn, t) {
  return (...args) => {
    let timeoutid
    const timer = new Promise((_, reject) => {
      timeoutid = setTimeout(() => {
        reject('Time Limited')
      }, t)
    })
    const promise1 = fn(...args).finally(() => clearTimeout(timeoutid))
    return Promise.race([timer, promise1])
  }
}

// ===== Fetch с повторными попытками =====
// Условие: Реализовать fetch с автоматическими повторными попытками
// Подход: Рекурсивный вызов при ошибках до исчерпания попыток
// Сложность: O(n) где n - количество попыток
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

// ===== Проверка результатов с таймаутом =====
// Условие: Проверить результаты двух асинхронных операций с общим таймаутом
// Подход:
// 1. Promise.race для каждого запроса с таймаутом
// 2. Promise.all для ожидания обоих результатов
// Сложность: O(1)
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

// ===== Fetch с таймаутом =====
// Условие: Реализовать fetch с таймаутом
// Подход: Promise.race между fetch и setTimeout
// Сложность: O(1)
function fetchWithTimeout(url, ms) {
  const response = fetch(url)
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'))
    }, ms)
  })
  return Promise.race([response, timeout])
}
