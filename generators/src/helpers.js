function betterStringSort(a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

module.exports = { betterStringSort }