// ===== 1. Каррирование функции =====
// Условие: Преобразовать функцию для поэтапного принятия аргументов
// Подход: Рекурсивное накопление аргументов до достижения нужного количества
// Сложность: O(1) для каждого вызова
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args) // Исправлено: добавлен return
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// Пример использования
const curriedSum = curry(sum)
console.log(curriedSum(1)(2)(3)) // 6

// ===== 2. Дебаунс (отложенное выполнение) =====
// Условие: Выполнить функцию только после паузы в вызовах
// Подход: Сброс и установка таймера при каждом вызове
// Сложность: O(1) для каждого вызова
function debounce(fn, delay) {
  let timeout
  return function(...args) {
    clearTimeout(timeout) // Сбрасываем предыдущий таймер
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// ===== 3. Троттлинг (ограничение частоты) - вариант 1 =====
// Условие: Ограничить частоту вызовов функции
// Подход: Пропуск вызовов, если не прошло достаточно времени
// Сложность: O(1) для каждого вызова
function throttle(fn, delay) {
  let lastCall = 0
  return function(...args) {
    const now = new Date().getTime()
    if (now - lastCall >= delay) {
      fn.apply(this, args)
      lastCall = now
    }
  }
}

// ===== 4. Троттлинг (усовершенствованный вариант) =====
// Условие: Ограничить частоту с сохранением последнего вызова
// Подход: Очередь из последних аргументов с гарантированным выполнением
// Сложность: O(1) для каждого вызова
function throttle2(fn, delay, ctx) {
  let lastCallArgs = null
  let blocked = false

  function setTimer() {
    blocked = true
    setTimeout(() => {
      blocked = false
      if (lastCallArgs) {
        fn.apply(ctx, lastCallArgs)
        lastCallArgs = null
        blocked = true
        setTimer()
      }
    }, delay)
  }

  return function(...args) {
    if (blocked) {
      lastCallArgs = args // Сохраняем аргументы последнего вызова
    } else {
      fn.apply(ctx, args)
      setTimer()
    }
  }
}

// ===== 5. Умный fetch с батчингом =====
// Условие: Объединять запросы в батчи для оптимизации
// Подход: Очередь запросов с выполнением по таймауту
// Сложность: O(n) для обработки батча
function createSmartFetch(timeout) {
  let timer = null
  let queue = new Map()
  
  return function smartfetch(id) {
    return new Promise((resolve) => {
      queue.set(id, resolve) // Добавляем в очередь
      
      if (!timer) {
        timer = setTimeout(async () => {
          const ids = Array.from(queue.keys())
          const resolves = new Map(queue)
          queue.clear()
          timer = null
          
          const result = await batchFetch(ids)
          ids.forEach(id => resolves.get(id)(result[id]))
        }, timeout)
      }
    })
  }
}

// Вспомогательная функция для имитации запроса
function batchFetch(ids) {
  return new Promise((resolve) => {
    console.log("Запрос к бэкенду:", ids)
    setTimeout(() => {
      const res = {}
      ids.forEach(id => res[id] = { id, title: `Item ${id}` })
      resolve(res)
    }, Math.random() * 1000)
  })
}

// Тестирование throttle2
function test() {
  const start = Date.now()
  
  function log(text) {
    const msPassed = Date.now() - start
    console.log(`${msPassed}ms: ${this.name} logged ${text}`)
  }
  
  const throttled = throttle2(log, 100, { name: "me" })
  
  setTimeout(() => throttled("m"), 0)     // сразу
  setTimeout(() => throttled("mo"), 22)   // игнор
  setTimeout(() => throttled("mos"), 33)  // сохраняем 'mos'
  setTimeout(() => throttled("mosc"), 150) // прошло 150мс — вызов
  setTimeout(() => throttled("moscow"), 400) // прошло ещё 250мс — вызов
}

test()
