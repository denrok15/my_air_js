function isanargam(s1, s2) {
  const normalize = (str) => str.replace(/\s/g, '').toLowerCase();
  const ss1 = normalize(s1)
  const ss2 = normalize(s2)
  if (s1.length !== s2.length) return false
  const charCount = {}
  for (const char of ss1) {
    charCount[char] = (charCount[char] || 0) + 1
  }
  for (const char of ss2) {
    if (!charCount[char]) return false
    charCount[char]--
  }
  return true
}

function isuniqeue(strs) {
  let buffer = ''
  for (const char of strs) {
    if (buffer.includes(char)) return false
    buffer += char
  }
  return true
}

function isone(arr) {
  const counter = {}
  for (const digit of arr) {
    counter[digit] = (counter[digit] || 0) + 1
  }
  for (const item of arr) {
    if (counter[item] === 1) return item
  }
}

console.log(isone([1, 2, 1, 3, 4, 3, 4]))

function binarysearch(arr, target) {
  let start = 0
  let end = arr.length - 1
  while (start <= end) {
    let middle = Math.floor((start + end) / 2)
    if (arr[middle] === target) return middle
    else {
      if (arr[middle] > target) end = middle - 1
      else {
        start = middle + 1

      }
    }
  }
  return -1
}

console.log(binarysearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4))


function isIsogram(s) {
  const letters = new Set()
  for (const char of s.toLowerCase()) {
    if (letters.has(char)) return false
    letters.add(char)
  }
  return true
}

function twosum(arr, target) {
  const values = {}
  for (let i = 0; i < arr.length; i++) {
    const completed = target - arr[i]
    if (values.hasOwnProperty(completed)) {
      return [values[completed], i]
    }
    values[arr[i]] = i

  }
  return []

}

function createfibmemo() {
  const cache = new Map()
  cache.set(0,0)
  cache.set(1,1)
  return function fibmemo(n) {
    if (cache.has(n)) {
      return cache.get(n)
    }
    const result = fibmemo(n - 1) + fibmemo(n - 2)
    cache.set(n,result)
    return result

  }
}
function slidingwindow(str) {
  let left = 0
  let maxlength = 0
  const chars = {}
  for (let right = 0; right < str.length; right++) {
    const curchar = str[right]
    if (chars[curchar] >= left) {
      left = chars[curchar] + 1
    }
    chars[curchar] = right
    maxlength = Math.max(maxlength, right - left + 1)
  }
  return maxlength
}

function maxpodmarra(nums) {
  let maxCurrent = nums[0]
  let maxGlobal = nums[0]
  for (let i = 1; i < nums.length; i++) {
    maxCurrent = Math.max(maxCurrent + nums[i],maxGlobal)
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent
    }
  }
  return maxGlobal
}

