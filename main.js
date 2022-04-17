let currentColor = "#333333";
let currentMode = "color";
let currentSize = 16;

let mouseDown = false;
let colorInput = document.getElementById("colorPicker");
let colorButton = document.getElementById("color");
let randomButton = document.getElementById("random");
let eraserButton = document.getElementById("eraser");
let clearButton = document.getElementById("clear");
let gridContainer = document.getElementById("gridContainer");
let gridSize = document.getElementById("sizeValue");
let sizeInput = document.getElementById("sizeSlider");

sizeInput.addEventListener("mousemove", (e) => {
  gridSize.innerText = `${e.target.value}x${e.target.value}`;
});
sizeInput.onchange = (e) => onSizeChange(e.target.value);
colorInput.onchange = (e) => onColorChange(e.target.value);
colorButton.onclick = (e) => setMod("color");
randomButton.onclick = (e) => setMod("random");
eraserButton.onclick = (e) => setMod("eraser");
clearButton.onclick = (e) => {
  gridContainer.innerHTML = "";
  onSizeChange(prompt("Enter grid size"));
};

function onColorChange(color) {
  currentColor = color;
}

function onSizeChange(newSize) {
  currentSize = newSize;
  reload();
}

function reload() {
  gridContainer.innerHTML = "";
  getGrid(currentSize);
  gridSize.innerText = `${currentSize}x${currentSize}`;
  sizeInput.value = currentSize;
}

window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

function changeColor(e) {
  if (mouseDown) {
    if (currentMode === "color") {
      e.target.style.backgroundColor = currentColor;
    }
    if (currentMode === "random") {
      let red = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
    } else if (currentMode === "eraser") {
      e.target.style.backgroundColor = "#ffffff";
    }
  }
}

function getGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid_child");
    gridElement.style.userSelect = "none";
    gridElement.addEventListener("mouseover", changeColor);
    gridContainer.appendChild(gridElement);
  }
  gridSize.innerText = `${currentSize}x${currentSize}`;
}

function setMod(newMod) {
  currentMode = newMod;
  if (newMod === "random") {
    randomButton.classList.add("active");
    colorButton.classList.remove("active");
    eraserButton.classList.remove("active");
  } else if (newMod === "color") {
    colorButton.classList.add("active");
    randomButton.classList.remove("active");
    eraserButton.classList.remove("active");
  } else if (newMod === "eraser") {
    eraserButton.classList.add("active");
    randomButton.classList.remove("active");
    colorButton.classList.remove("active");
  }
}

getGrid(currentSize);
