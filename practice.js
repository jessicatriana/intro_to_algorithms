// MY Recursive Binary Search

let list = [4, 7, 13, 18, 22]

let defaultCompare = (a, b) => {
  return a > b ? 1 : a < b ? -1 : 0
}

let recursiveBinarySearch = (
  array,
  element,
  compare = defaultCompare,
  left = 0,
  right = array.length - 1
) => {
  if (left > right) {
    return -1
  }
  const middle = Math.floor((left + right) / 2)
  const comparison = compare(element, array[middle])

  return comparison === -1
    ? recursiveBinarySearch(array, element, compare, left, middle - 1)
    : comparison === 1
    ? recursiveBinarySearch(array, element, compare, middle + 1, right)
    : middle
}

console.log(recursiveBinarySearch(list, 18))
// Returns 3
// The number 18 is in the 3rd position in the array
