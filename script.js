// Treasure Hunt Prototype Script

document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration-form");
  const usernameInput = document.getElementById("username");
  const registerSection = document.getElementById("register-section");
  const clueSection = document.getElementById("clue-section");
  const clueText = document.getElementById("clue-text");
  const progressSection = document.getElementById("progress-section");
  const progressText = document.getElementById("progress-text");
  const finalSection = document.getElementById("final-section");

  // Predefined clues and QR code values for scanning
  const clues = [
    {
      clue: "Welcome to the hunt! Your first clue is: Find the place where books sleep.",
      qrValue: "clue1"
    },
    {
      clue: "Great! Next clue: Search near the old oak tree for a hidden message.",
      qrValue: "clue2"
    },
    {
      clue: "Almost there! Head to the fountain to find your next clue.",
      qrValue: "clue3"
    },
    {
      clue: "Final step! The treasure is where the sun sets over the hills.",
      qrValue: "clue4"
    }
  ];

  let currentClueIndex = 0;
  let user = null; // store username

  // Initialize HTML5 QR code scanner
  const html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader",
    { fps: 10, qrbox: 250 },
    false
  );

  function updateProgress() {
    progressText.textContent = `${user}, you have solved ${currentClueIndex} out of ${clues.length} clues.`;
  }

  function showClue(index) {
    if (index < clues.length) {
      clueText.textContent = clues[index].clue;
    } else {
      // Completed all clues
      clueSection.classList.add("hidden");
      progressSection.classList.add("hidden");
      finalSection.classList.remove("hidden");
      html5QrcodeScanner.clear().catch(() => {});
    }
  }

  function onScanSuccess(decodedText, decodedResult) {
    // Compare scanned QR value with current expected
    if (decodedText === clues[currentClueIndex].qrValue) {
      alert("Correct QR code! Proceeding to next clue.");
      currentClueIndex++;
      if (currentClueIndex < clues.length) {
        showClue(currentClueIndex);
        updateProgress();
      } else {
        showClue(currentClueIndex);
      }
    } else {
      alert("Scanned QR code doesn't match the current clue. Try again.");
    }
  }

  function onScanError(errorMessage) {
    // (Optional) console log scan errors
    // console.warn(`QR Scan error: ${errorMessage}`);
  }

  html5QrcodeScanner.render(onScanSuccess, onScanError);

  registrationForm.onsubmit = (e) => {
    e.preventDefault();
    const name = usernameInput.value.trim();
    if (name === "") {
      alert("Please enter your name to join.");
      return;
    }
    user = name;
    registerSection.classList.add("hidden");
    clueSection.classList.remove("hidden");
    progressSection.classList.remove("hidden");
    currentClueIndex = 0;
    showClue(currentClueIndex);
    updateProgress();
  };
});
