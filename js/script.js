const textElement = document.getElementById('text');
const originalHTML = textElement.innerHTML; // Get the original content
const sentences = originalHTML.split('<br>'); // Split into sentences at <br>

let currentSentence = 0;
let currentCharacter = 0;
let isDeleting = false;
const typingDelay = 100;
const deletingDelay = 50;
const endPause = 2000; // Pause at the end of a sentence

function typeEffect() {
  if (currentSentence >= sentences.length) {
    currentSentence = 0; // Reset to the first sentence after the last one
  }
  
  let displayedText = sentences[currentSentence].substring(0, currentCharacter);

  if (!isDeleting) {
    currentCharacter++;
    textElement.innerHTML = displayedText;
    if (currentCharacter === sentences[currentSentence].length) {
      // Pause at the end of a sentence before deleting
      isDeleting = true;
      setTimeout(typeEffect, endPause);
      return;
    }
  } else {
    currentCharacter--;
    textElement.innerHTML = displayedText;
    if (currentCharacter === 0) {
      // Move to the next sentence after deletion completes
      isDeleting = false;
      currentSentence++;
    }
  }

  setTimeout(typeEffect, isDeleting ? deletingDelay : typingDelay);
}

// Initialize the effect
textElement.innerHTML = ''; // Clear the initial content
typeEffect();
