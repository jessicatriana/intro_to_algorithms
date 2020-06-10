/* Typical comparison function */
let defaultCompare = (a, b) => (a > b ? 1 : a < b ? -1 : 0)

/* Version 1:
    O(n)
    Fixed memory
    Loops
*/

let binarySearchWithLoops = (array, element, compare = defaultCompare) => {
  let left = 0
  let right = array.length - 1

  while (left <= right) {
    let middle = Math.floor((right + left) / 2)

    switch (compare(element, array[middle])) {
      case -1: {
        right = middle - 1
        break
      }
      case 1: {
        left = middle + 1
        break
      }
      default: {
        return middle
      }
    }
  }
  return -1
}

// RECURSIVE SOLUTION

let binarySearchWithRecursion = (
  array,
  element,
  compare = defaultCompare,
  left = 0,
  right = array.length - 1
) => {
  if (left > right) {
    return -1
  }
  const middle = Math.floor((right + left) / 2)
  const comparison = compare(element, array[middle])

  return comparison === -1
    ? binarySearchWithRecursion(array, element, compare, left, middle - 1)
    : comparison === 1
    ? binarySearchWithRecursion(array, element, compare, middle + 1, right)
    : middle
}

// DRY RECRUSIVE SOLUTION

let dryBinarySearchWithRecursion = (
  array,
  element,
  compare = defaultCompare,
  left = 0,
  right = array.length - 1
) => {
  if (left > right) {
    return -1
  }
  const middle = Math.floor((right + left) / 2)
  const comparison = compare(element, array[middle])

  if (comparison === 0) {
    return middle
  }

  const newBounds = comparison === -1 ? [left, middle - 1] : [middle + 1, right]

  return dryBinarySearchWithRecursion(array, element, compare, ...newBounds)
}

// BINARY SEARCH WITH ARRAY SPLITTING
// Memory usage is no longer fixed, not O(n)
// Higher memory usage and slower runtime

let binarySearchWithArraySplitting = (
  array,
  element,
  compare = defaultCompare
) => {
  if (array.length === 0) {
    return -1
  }
  const middle = Math.floor(array.length / 2)
  const comparison = compare(element, array[middle])

  if (comparison === 0) {
    return middle
  }

  const [left, right] =
    comparison === -1 ? [0, middle - 1] : [middle + 1, array.length]

  const subIndex = binarySearchWithRecursion(
    array.slice(left, right),
    element,
    compare
  )
  return subIndex === -1 ? -1 : left + subIndex
}

// Using ArrayView is a copy of the array and gives better performance

let ArrayView = (array, start = 0, end = array.length) => ({
  start,
  length: array.length,
  toArray: () => array.slice(start, end),
  slice: (dStart, dEnd) => ArrayView(array, start + dStart, start + dEnd),
  get: index => {
    let realIndex = start + index
    realIndex < end && realIndex >= start ? array[realIndex] : undefined
  }
})

let binarySearchWithArrayView = (array, ...args) =>
  binarySearchWithArraySplitting(ArrayView(array), ...args)

// ARRAY PARTITION

let ArrayPartition = (array, pivot) => ({
  left: () => array.slice(0, pivot),
  middle: () => array.get(pivot),
  right: () => array.slice(pivot + 1, array.length)
})

let binarySearchWithPartition = (array, element, compare = defaultCompare) => {
  if (array.length === 0) {
    return -1
  }
  const middle = Math.floor(array.length / 2)
  const part = ArrayPartition(array, middle)
  const comparison = compare(element, part.middle)

  return comparison === 0
    ? array.start + middle
    : binarySearchWithPartition(
        comparison === -1 ? part.left() : part.right(),
        element,
        compare
      )
}

let binarySearchWithPartitionAndView = (array, ...args) =>
  binarySearchWithPartition(ArrayView(array), ...args)
