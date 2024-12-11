// Get the root element
const rootStyles = getComputedStyle(document.documentElement);

// Access a specific CSS variable
const redColor = rootStyles.getPropertyValue("--red").trim();
const orangeColor = rootStyles.getPropertyValue("--orange").trim();
const yellowColor = rootStyles.getPropertyValue("--yellow").trim();
const greenColor = rootStyles.getPropertyValue("--neon-green").trim();
const whiteColor = rootStyles.getPropertyValue("--almost-white").trim();

// Set up variables
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

// Generate Random Password

function generatePassword() {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  // Get user selections
  const includeUppercase = document.getElementById("includeUppercase").checked;
  const includeLowercase = document.getElementById("includeLowercase").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeSymbols = document.getElementById("includeSymbols").checked;
  const length = parseInt(document.getElementById("character-length").value);

  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    alert("Please select at least one character type!");
    return;
  }

  // Build the character pool based on users selection
  let characterPool = "";
  if (includeUppercase) characterPool += uppercase;
  if (includeLowercase) characterPool += lowercase;
  if (includeNumbers) characterPool += numbers;
  if (includeSymbols) characterPool += specialChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += getRandomChar(characterPool);
  }

  // Display password and change some styles
  passwordElement.innerText = password;
  passwordElement.style.color = whiteColor;
  passwordElement.style.opacity = "1";

  // Evaluate password strength
  const strength = evaluatePasswordStrength(password);
  updateStrengthMeter(strength);
}

// Get Random str from character pool
function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

// Function to evaluate password strength
function evaluatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++; // Minimun length
  if (/[A-Z]/.test(password)) strength++; // Contains uppercase
  if (/[a-z]/.test(password)) strength++; // Contains lowercase
  if (/[0-9]/.test(password)) strength++; // Contains numbers
  if (/[^A-Za-z0-9]/.test(password)) strength++; // Contains lowercase

  return strength;
}

function updateStrengthMeter(strength) {
  const boxes = document.querySelectorAll(".strength-bar");
  const rating = document.querySelector(".rating");

  // Reset all boxes to default styles
  boxes.forEach((box) => {
    box.style.backgroundColor = "transparent";
    box.style.border = `2px solid ${whiteColor}`; // Default border
  });

  // Update styles for active boxes based on strength
  for (let i = 0; i < strength; i++) {
    if (strength === 1) {
      boxes[i].style.backgroundColor = redColor;
      rating.innerText = "too weak!"; // Too weak
    } else if (strength === 2) {
      boxes[i].style.backgroundColor = orangeColor;
      rating.innerText = "weak"; // Weak
    } else if (strength === 3) {
      boxes[i].style.backgroundColor = yellowColor;
      rating.innerText = "medium"; // Medium
    } else if (strength >= 4) {
      boxes[i].style.backgroundColor = greenColor;
      rating.innerText = "strong"; // Strong
    }

    boxes[i].style.border = "none"; // Remove border for active boxes
  }
}
