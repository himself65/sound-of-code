var array = [9, 2, 5, 0, 8];
console.log(array);

for (var i = 0; i < array.length; i++) {
  for (var j = 1; j < array.length; j++) {
    console.log(array);

    if (array[j - 1] > array[j]) {
      var temp = array[j - 1];
      array[j - 1] = array[j];
      array[j] = temp;
    }
  }
}

console.log(array); // [0, 2, 5, 8, 9]
