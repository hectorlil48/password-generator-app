// Get the root element
const rootStyles = getComputedStyle(document.documentElement);

// Access a specific CSS variable
const redColor = rootStyles.getPropertyValue("--red").trim();
const orangeColor = rootStyles.getPropertyValue("--orange").trim();
const yellowColor = rootStyles.getPropertyValue("--yellow").trim();
const greenColor = rootStyles.getPropertyValue("--neon-green").trim();
const whiteColor = rootStyles.getPropertyValue("--almost-white").trim();

// Set up variables
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
const passwordElement = document.querySelector(".password");
const iconElement = document.querySelector(".icon");
const copiedMessage = document.querySelector(".copied-message");

// Array of bad words
const badWords = [
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "dick",
  "cock",
  "pussy",
  "bastard",
  "bimbo",
  "cunt",
  "whore",
  "slut",
  "fag",
  "nigger",
  "chink",
  "spic",
  "kike",
  "queer",
  "faggot",
  "retard",
  "motherfucker",
  "twat",
  "prick",
  "douchebag",
  "cum",
  "piss",
  "pussy",
  "testicle",
  "rape",
  "incest",
  "bestiality",
  "pedophile",
  "rape",
  "stupid",
  "ugly",
  "fat",
  "slutty",
  "skank",
  "whore",
  "idiot",
  "moron",
  "retarded",
  "cockhead",
  "cocktail",
  "dickhead",
  "cockfucker",
  "jizz",
  "anal",
  "butt",
  "shithead",
  "crackhead",
  "motherfucking",
  "suckmydick",
  "asshat",
  "cockwomble",
  "muppet",
  "toadstool",
  "bitchface",
  "fucktard",
];

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
  const length = parseInt(document.getElementById("slider").value);

  if (
    (!includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols) ||
    length <= 0
  ) {
    alert(
      "Please select at least one character type and specify a valid password length!"
    );
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

  // Check if the generated password contains any bad words
  if (containsBadWords(password)) {
    return generatePassword(); // Regenerate password if it contains bad words
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

// Function to check if a password contains any bad words
function containsBadWords(password) {
  for (let word of badWords) {
    if (password.toLowerCase().includes(word)) {
      return true;
    }
  }
  return false;
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
  // Set the color for boxes based on the strength
  for (let i = 0; i < boxes.length; i++) {
    if (i < strength) {
      if (strength === 1) {
        boxes[i].style.backgroundColor = redColor;
      } else if (strength === 2) {
        boxes[i].style.backgroundColor = orangeColor;
      } else if (strength === 3) {
        boxes[i].style.backgroundColor = yellowColor;
      } else if (strength >= 4) {
        boxes[i].style.backgroundColor = greenColor;
      }
      boxes[i].style.border = "none"; // Remove border for active boxes
    } else {
      boxes[i].style.backgroundColor = "transparent"; // Reset the inactive boxes
    }
  }

  // Update the rating text based on strength
  if (strength === 1) {
    rating.innerText = "too weak!";
  } else if (strength === 2) {
    rating.innerText = "weak";
  } else if (strength === 3) {
    rating.innerText = "medium";
  } else if (strength >= 4) {
    rating.innerText = "strong";
  }
}
