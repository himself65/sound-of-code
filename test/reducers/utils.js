// utils.js

// Function to capitalize the first letter of a string
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to calculate the average of an array of numbers
export function calculateAverage(arr) {
    const total = arr.reduce((acc, num) => acc + num, 0);
    return total / arr.length;
}