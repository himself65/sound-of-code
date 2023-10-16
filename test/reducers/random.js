function generateRandomNumber() {
    return Math.floor(Math.random() * 101);
}

document.getElementById('randomDisplay').innerText = generateRandomNumber();