function digitPermutation(arr) {
  const map = {}
  arr.forEach(digit => {
    const arrDigit = digit
      .toString()
      .split('')
      .filter(el => el !== '0')
      .sort()
    if (map[arrDigit]) {
      map[arrDigit].push(digit)
    } else {
      map[arrDigit] = digit
    }

  })
  return Object.values(map)
}
