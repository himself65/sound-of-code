let num1Input = document.getElementById('num1');
let num2Input = document.getElementById('num2');
let resultDisplay = document.getElementById('result');

function calculateSum() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const sum = num1 + num2;
    resultDisplay.innerText = "Result: " + sum;
}

document.getElementById('calculateButton').addEventListener('click', calculateSum);