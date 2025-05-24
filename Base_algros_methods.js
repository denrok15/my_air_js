function double(arr) {
  return arr.map((element) =>
    element * 2
  )
}
function mergeArrays(arr1, arr2) {
  const result = []
  let i = 0, j = 0
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i])
      i += 1
    } else {
      result.push(arr2[j])
      j += 1
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i])
    i += 1
  }
  while (j < arr2.length) {
    result.push(arr2[j])
    j += 1
  }
  return result
}
function multiplyAll(...numbers) {
  return numbers.reduce((acc, value) => acc * value, 1)
}




function filterEven(arr) {
  return arr.filter((element) => element % 2 === 0)
}

function sum(arr) {
  return arr.reduce((acc, element) => acc + element)
}

function reverse(arr) {
  return arr.slice().reverse()
}

function getKeys(obj) {
  const result = []
  for (const key in obj) {
    if (typeof obj[key] === 'object') result.push(...getKeys(obj[key]))
    else result.push(key)
  }
  return result
}

function getValues(obj) {
  const result = []
  for (const key in obj) {
    if (typeof obj[key] === 'object') result.push(...getValues(obj[key]))
    else result.push(obj[key])
  }
  return result
}
function invert(arr) {

}
