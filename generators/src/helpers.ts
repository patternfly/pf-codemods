function betterStringSort(a: string, b: string) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

module.exports = { betterStringSort };
