const slider = document.getElementById("character-length");
const sliderValue = document.getElementById("slider-value");
const passwordElement = document.querySelector(".password");
const iconElement = document.querySelector(".icon");
const copiedMessage = document.querySelector(".copied-message");

// Function to update the slider's display and style
function updateSlider(slider, valueDisplay) {
  const min = Number(slider.min);
  const max = Number(slider.max);
  const value = Number(slider.value);

  // Update the displayed value
  valueDisplay.textContent = value;

  // Calculate percentage and update gradient
  const percentage = ((value - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, #00ff76 ${percentage}%, #1c1c1c ${percentage}%)`;
}

// Initialize the slider on page load
window.addEventListener("DOMContentLoaded", () => {
  updateSlider(slider, sliderValue);
});

// Update slider dynamically on input
slider.addEventListener("input", () => updateSlider(slider, sliderValue));

// Function to show the "Copied" message
function showCopiedMessage() {
  copiedMessage.style.display = "block";
  // Hide the copied message after 2 seconds
  setTimeout(() => {
    copiedMessage.style.display = "none";
  }, 2000);
}

// Copy the password when clicking the icon
iconElement.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordElement.textContent).then(() => {
    showCopiedMessage();
  });
});

// Handle the "copy event when the user manually selects and copies the text."
document.addEventListener("copy", (event) => {
  const selection = window.getSelection().toString();
  if (selection === passwordElement.textContent) {
    showCopiedMessage();
  }
});
