var createCounter = function (init) {
  let innervalue = init
  const methods = {
    reset: () => {
      innervalue = init
      return innervalue
    },
    decrement: () => --innervalue,
    increment: () => ++innervalue
  }
  return methods
}
var fetchWithAutoRetry = async function (fetcher, count) {
  while (count > 0) {
    let error
    try {
      const v = await fetcher()
      return v
    } catch (errorval) {
      error = errorval
      count -= 1
    }
  }
  return Promise.reject(error)

}
var fetchWithAutoRetry2 = async function (fetcher, count) {
  try {
    const v = await fetcher()
    return v
  } catch {
    if (count > 0) fetchWithAutoRetry2(fetcher, count - 1)
    else return Promise.reject('Error')
  }
}

function request() {
  return LogIn().then((token) => {
    Promise.all([
      Promise.resolve(token),
      getChats(token).catch(() => void 0),
      getUsername(token).catch(() => void 0),
      getAvatar(token).catch(() => void 0)
    ])
      .then(([chats, username, avatar]) => {
        if (chats.length) {
          return Promise.all([getMessages(token, chats[0]).catch(() => void 0), Promise.resolve([chats, username, avatar])])
        }
        return [
          undefined,
          username,
          avatar,
          chats,
        ]

      })
      .then(([messages, chats, username, avatar]) => messages, chats, username, avatar)

  })
}

function memoize(fn) {
  const memo = new Map()
  return function (...args) {
    const hash = args.join('_')
    if (memo.has(hash)) return memo.get(hash)
    const value = fn(...args)
    memo.set(hash, value)
    return value
  }
}


let callCount = 0
const memoizedFn = memoize(function (a, b) {
  callCount += 1
  return a + b
})

