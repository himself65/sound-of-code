// Split the array into halves and merge them recursively
function mergeSort(arr) {
  console.log(arr);

  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr;
  }

  const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
  const left = arr.slice(0, middle); // items on the left side
  const right = arr.slice(middle); // items on the right side

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  console.log([sortedLeft, sortedRight]);

  const result = merge(sortedLeft, sortedRight);

  console.log(result, "\n");

  return result;
}

// compare the arrays item by item and return the concatenated result
function merge(left, right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

const list = [9, 2, 5, 0, 8];
const sortedList = mergeSort(list); // [0, 2, 5, 8, 9]

console.log("Original:", list);
console.log("Sorted:", sortedList);
