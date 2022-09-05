"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelector("#color-input").addEventListener("input", getColorValue);
}

let color;
let rgb;
let hsl;

function getColorValue() {
  color = document.querySelector("#color-input").value;
  console.log(color);
  getRgb(color);
}

function getRgb(color) {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, color.length), 16);
  rgb = `R: ${r}, G: ${g}, B: ${b}`;
  getHsl(r, g, b);
}

function getHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  hsl = `${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%`;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  updateOutput();
}

function updateOutput() {
  document.querySelector("#output").style.backgroundColor = color;
  document.querySelector("#hex").textContent = `HEX: ${color}`;
  document.querySelector("#rgb").textContent = `RGB: ${rgb}`;
  document.querySelector("#hsl").textContent = `HSL: ${hsl}`;

  start();
}
