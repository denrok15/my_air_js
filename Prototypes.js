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
Array.prototype.flatMapGroupBy = function (fn) {
  const collection = {}
  for (const item of this) {
    const key = fn(item)
    if (key in collection) {
      collection[key].push(item)
    } else {
      collection[key] = [item]
    }
  }
  return collection

}
Array.prototype.flati = function () {
  const result = []
  this.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...item.flati())
    } else {
      result.push(item)
    }
  })
  return result


}
const ar = [1,[2,[3],4],5]
console.log(ar.flati())

Array.prototype.groupby = function (fn) {
  const result = {}
  this.forEach((value) => {
    const key = fn(value)
    if (result[key]) result[key].push(value)
    else result[key] = [value]

  })


  return result

}

