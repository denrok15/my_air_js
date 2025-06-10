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
  let tastcall = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - tastcall >= delay) {
      fn.apply(this, args)
      tastcall = now
    }

  }
}

function throttle2(fn, delay, ctx) {
  let lastCallArgs = null;
  let blocked = false;

  function setTimer() {
    blocked = true;

    setTimeout(() => {
      blocked = false;

      if (lastCallArgs) {
        fn.apply(ctx, lastCallArgs);
        lastCallArgs = null;
        blocked = true;
        setTimer();
      }
    }, delay);
  }

  return function (...args) {
    if (blocked) {
      lastCallArgs = args;
    } else {
      fn.apply(ctx, args);
      setTimer();
    }
  };
}

function test() {
  const start = Date.now();

  function log(text) {
    const mPassed = Date.now() - start;

    console.log(`${mPassed}: ${this.name} logged ${text}`);
  }

  const throttled = throttle(log, 100, {name: "me"});

  setTimeout(() => throttled("m"), 0); // сразу
  setTimeout(() => throttled("mo"), 22); // игнор
  setTimeout(() => throttled("mos"), 33); // сохраняем 'mos'
  setTimeout(() => throttled("mosc"), 150); // прошло 150мс — вызов
  setTimeout(() => throttled("moscow"), 400); // прошло ещё 250мс — вызов
}

test();


function createsmartfetch(timeout) {
  let timer = null
  let queue = new Map()
  return function smartfetch2(id) {
    return new Promise((resolve) => {
      if (!timer) {
        timer = setTimeout(async () => {
          const ids =  Array.from(queue.keys())
          const resolves = new Map(queue)
          queue.clear()
          timer = null
          const result = await batchFetch(ids)
          for (const id of ids) {
            resolves.get(id)(result[id])
          }

        }, timeout)
      }
    })


  }
}
function createsmartfetch2(timeout) {
  let queue = new Map()
  let timer = null
  return function smartfetch2(id) {
    return new Promise((resolve) => {
      queue.set(id,resolve)
      if (!timer) {
        timer = setTimeout(async () => {
          const ids =  Array.from(queue.keys())
          const resolves = new Map(queue)
          queue.clear()
          timer = null

          const result = await batchFetch(id)
          for (const id of ids) {
            queue.get(id)(result[id])
          }
        },timeout)
      }
    })
  }
}

function batchFetch(ids) {
  return new Promise((resolve) => {
    console.log("запрос к бэкенду", ids);
    setTimeout(() => {
      const res = {};
      ids.forEach((id) => (res[id] = {id, title: id}));
      resolve(res);
    }, Math.random() * 1000);
  });
}


// 0ms: me logged m
// 100ms: me logged mos
// 200ms: me logged mosc
// 400ms: me logged moscow
