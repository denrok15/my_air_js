function compress(s) {
  let buffer = ''
  let numbuffer = 1
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) {
      numbuffer++
    } else {
      buffer += s[i] + String(numbuffer)
      numbuffer = 1
    }
  }
  return buffer
}

function flatMap(arr, fn) {
  const result = []
  arr.forEach((element) => {
    result.push(...fn(element))
  })
  return result
}


const data = {
  name: "folder",
  children: [
    {name: "file1.txt"},
    {
      name: "images",
      children: [
        {name: "img.png"},
        {name: "logo.jpg"}
      ]
    }
  ]
};

console.log(getPaths(data));

function groupByDigitProduct(arr) {
  const result = {}
  arr.forEach((digit) => {
    const key = String(digit)
      .split('')
      .reduce((acc, el) => {
        if (el !== '0') {
          return acc * el
        } else {
          return acc
        }
      })
    if (result[key]) {
      result[key].push(digit)
    } else {
      result[key] = [digit]
    }

  }, 1)
  return Object.values(result)

}

function testGroupByDigitProduct() {
  const result1 = groupByDigitProduct([123, 231, 12, 21, 13, 31, 102]);
  console.assert(result1.some(g => JSON.stringify(g.sort()) === JSON.stringify([123, 231].sort())), "Test 1 failed");
  console.assert(result1.some(g => JSON.stringify(g.sort()) === JSON.stringify([12, 21].sort())), "Test 2 failed");
  console.assert(result1.some(g => JSON.stringify(g.sort()) === JSON.stringify([13, 31].sort())), "Test 3 failed");
  console.assert(result1.some(g => JSON.stringify(g) === JSON.stringify([102])), "Test 4 failed");
  console.log("groupByDigitProduct passed");
}

testGroupByDigitProduct()
function flati (arr) {
  const result = []
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...flati(item))
    } else {
      result.push(item)
    }

  })
  return result
}
