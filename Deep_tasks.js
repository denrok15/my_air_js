function deepclone(obj) {
  if (obj === null || typeof obj === 'object') return obj
  if (Array.isArray(obj)) {
    const result = []
    for (let i = 0; i < obj.length; i++) {
      result[i] = deepclone(obj[i])
    }

    return result
  }
  const result = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) result[key] = deepclone(obj[key])
  }

  return result

}

function equal(a,b) {
  if (a === b) return true
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (let key of keysA) {
    if(!keysB.includes(key)) return false;
    if(!equal(a[key], b[key])) return false;
  }
  return true
}
