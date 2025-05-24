function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (let key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

Array.prototype.chunc = function (n) {
  const result = []
  let buffer = []
  for (const value of this) {
    buffer.push(value)
    if (buffer.length === n) {
      result.push(buffer)
      buffer = []
    }

  }
  if (buffer.length > 0) {
    result.push(buffer);
  }
  return result
}
Array.prototype.chunc2 = function (n) {
  const result = []
  for (let i = 0; i < this.length; i += n) result.push(this.slice(i, i + n))
  return result
}

function fecthwithTimeout(url, ms) {
  const responce = fetch(url)
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error('Timeout'), ms)
      },
    )
  })
  return Promise.race([responce, timeout])
}
