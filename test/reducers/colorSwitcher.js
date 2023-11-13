let colors = ["red", "blue", "green", "yellow", "pink"];
let currentColorIndex = 0;

function switchColor() {
  document.body.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}

document
  .getElementById("switchColorButton")
  .addEventListener("click", switchColor);
