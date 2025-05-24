var splitWordsBySeparator = function (words, separator) {

  return words.map((word) =>
    word.split(separator)
  ).flat().filter((word) => word !== '')

}
console.log(splitWordsBySeparator(['a.b', 'c.d'], '.'));
var splitWordsBySeparator2 = function (words, separator) {
  const result = []
  for (const word of words) {
    const value = word.split(separator)
    value.forEach((v) => {
      if (v.length) result.push(v)
    })
  }

  return result

}
var createCounter = function (init) {
  let innerValue = init
  const methods = {
    reset: () => {
      innerValue = init
      return innerValue
    },
    increment: () => innerValue++,
    decrement: () => innerValue--,
  }
  return methods

}
var addTwoPromises = async function (promise1, promise2) {
  const s1 = await promise1
  const s2 = await promise2
  return s1 + s2
}
console.log(addTwoPromises(Promise.resolve(1), Promise.resolve(2)))

var fetchWithAutoRetry = function (fetcher, count) {
  return fetcher().then(res => res.json())
    .catch(err => {
      if (count > 0) return fetchWithAutoRetry(fetcher, count - 1)
      else return Promise.reject('Error')
    })
}
var fetchWithAutoRetry2 = async function (fetcher, count) {
  let error
  while (count > 0) {
    try {
      const v = await fetcher()
      return v
    } catch (innererror) {
      count -= 1
      error = innererror

    }
  }
  return Promise.reject(error)


}
var maximumValue = function (strs) {
  let max = 0
  for (const char of strs) {
    if (Number.isInteger(+char)) {
      max = Math.max(max, +char)

    } else {
      max = Math.max(max, char.length)
    }
  }
  return max

}


var maximumValue2 = function (strs) {
  return strs.reduce((acc, element) => {
    if (Array.from(str).every(($symbol) => $symbol >= '0' && $symbol <= '9')) {
      const value = Number(str)
      return Math.max(acc, value)
    }
    return Math.max(acc, str.length)
  })
}
console.log(maximumValue(['alic3', 'bob', '3', '4', '00000'])) // 5
console.log(maximumValue(['1', '01', '001', '0001'])) // 1
//1. 0003 > 3
//2  alic3 > 5
