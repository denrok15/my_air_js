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

  const throttled = throttle(log, 100, { name: "me" });

  setTimeout(() => throttled("m"), 0); // сразу
  setTimeout(() => throttled("mo"), 22); // игнор
  setTimeout(() => throttled("mos"), 33); // сохраняем 'mos'
  setTimeout(() => throttled("mosc"), 150); // прошло 150мс — вызов
  setTimeout(() => throttled("moscow"), 400); // прошло ещё 250мс — вызов
}

test();

// 0ms: me logged m
// 100ms: me logged mos
// 200ms: me logged mosc
// 400ms: me logged moscow
