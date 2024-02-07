const isLocalStorageCleared = localStorage.length === 0;

// If local storage is cleared, show the welcome page
if (isLocalStorageCleared) {
  const welcomeContainer = document.querySelector(".welcome-container");
  welcomeContainer.style.display = "flex";

  // Add event listener for the "Start Quiz" button
  // const startQuizButton = document.getElementById('startQuizButton');
  // startQuizButton.addEventListener('click', startQuiz);
} else {
  // If local storage is not cleared, directly initialize the quiz
  const numQuestions = localStorage.getItem("numQuestions");
  if (numQuestions) {
    initializeQuiz(parseInt(numQuestions, 10));
  }
}

function startQuiz() {
  const numQuestionsInput = document.getElementById("numQuestionsInput");
  const numQuestions = parseInt(numQuestionsInput.value);

  if (isNaN(numQuestions) || numQuestions <= 0) {
    alert("Please enter a valid number of questions.");
    return;
  }

  // Save the number of questions to local storage
  localStorage.setItem("numQuestions", numQuestions);

  // Initialize the quiz
  initializeQuiz(numQuestions);
}

function initializeQuiz(numQuestions) {
  // Hide the welcome container

  const welcomeContainer = document.querySelector(".welcome-container");
  welcomeContainer.style.display = "none";

  // Display the quiz content as a flex container
  const quizContent = document.getElementById("content");
  quizContent.style.display = "flex";

  const timerInput = document.getElementById("timerInput");
  const timerValue = parseInt(timerInput.value, 10);

  // Start timer logic
  startTimer(timerValue * 60);

  function startTimer(duration) {
    let timer = duration,
      minutes,
      seconds;
    const timerInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Display the timer or update your UI accordingly

      document.getElementById("timer").innerText = minutes + ":" + seconds;
      // console.log(minutes + ':' + seconds);

      if (--timer < 0) {
        clearInterval(timerInterval);
        // Perform actions when the timer reaches 0
        console.log("Quiz time is up!");
        alert("Quiz time is up!");
      }
    }, 1000);
  }

  //ADD

  const qNosRight = document.querySelector(".q-nos-right");

  const TOTAL_QS_NO = numQuestions;

  for (let i = 1; i <= TOTAL_QS_NO; i++) {
    const button = document.createElement("a");
    button.href = "#";
    button.className = "q-nos-right";
    button.textContent = i;

    //   button.addEventListener('click', function () {
    //     setTimeout(() => {
    //       const questionDiv = document.getElementById(`question${i}`);

    //       console.log(questionDiv)
    //       if (questionDiv) {
    //         questionDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //       }
    //     }, 100); // Adjust the delay if needed
    //     questionDiv.classList.add("found");
    //   });
    button.addEventListener("click", function () {
      setTimeout(() => {
        const questionDiv = document.getElementById(`question${i}`);
        //
        // const questionDivprev2view = document.getElementById(`question${i-2}`);

        console.log(questionDiv);
        if (questionDiv) {
          const scrollPaddingTop = 5;
          const highlightDuration = 2000;

          questionDiv.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          questionDiv.style.border = "5px solid white"; // Adjust the border style as needed
          questionDiv.style.borderRadius = "5px"; // Adjust the border style as needed
          // Reset the border after the highlight duration
          setTimeout(() => {
            questionDiv.style.border = "none";
            questionDiv.style.borderRadius = "none"; // Adjust the border style as needed
          }, highlightDuration);
        }
      }, 100); // Adjust the delay if needed
      // questionDiv.classList.add("found");
    });

    qNosRight.appendChild(button);
  }

  // Ask the user whether to clear local storage on each refresh
  //   const shouldClearLocalStorage = confirm("Do you want to clear local storage on each refresh?");

  //   if (shouldClearLocalStorage) {
  //       localStorage.clear();
  //       alert("Local storage has been cleared.");
  //   }

  const questionContainer = document.getElementById("questionContainer");

  // Generate questions with single selectable options (A, B, C, or D)
  for (let i = 1; i <= TOTAL_QS_NO; i++) {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.id = `question${i}`;

    // Display question number
    const questionNumber = document.createElement("span");
    questionNumber.textContent = `Q${i}: `;
    questionDiv.appendChild(questionNumber);

    // Generate options A, B, C, and D
    for (let optionIndex = 0; optionIndex < 4; optionIndex++) {
      const optionButton = document.createElement("div");
      optionButton.className = "option-button";
      optionButton.textContent = String.fromCharCode(65 + optionIndex); // Convert ASCII code to letters (A, B, C, ...)

      // Attach a click event listener to each option
      optionButton.addEventListener("click", () => {
        selectOption(questionDiv, optionButton, i);
        console.log(`Answer for question ${i}: ${optionButton.textContent}`);
      });

      questionDiv.appendChild(optionButton);
    }

    questionContainer.appendChild(questionDiv);

    // Load saved answer for the question if available
    const savedAnswer = localStorage.getItem(`answer_${i}`);
    if (savedAnswer) {
      const selectedOption = questionDiv.querySelector(
        `.option-button[data-value="${savedAnswer}"]`
      );
      if (selectedOption) {
        selectOption(questionDiv, selectedOption, i);
      }
    }
  }

  // Function to handle selecting an option within a question
  function selectOption(questionDiv, selectedOption, questionNumber) {
    const options = questionDiv.querySelectorAll(".option-button");
    const qNosButton = qNosRight.querySelector(
      `.q-nos-right:nth-child(${questionNumber})`
    );
    if (qNosButton) {
      qNosButton.classList.toggle("q-nos-selected");
    }

    console.log(qNosButton);

    for (let i = 1; i <= options.length; i++) {
      localStorage.removeItem(`answer_${questionNumber}`);
    }

    options.forEach((option) => {
      if (option === selectedOption) {
        option.classList.toggle("selected");

        if (option.classList.contains("selected")) {
          // Add the selected option to local storage
          const selectedAnswer = selectedOption.textContent;
          localStorage.setItem(`answer_${questionNumber}`, selectedAnswer);
        }
      } else {
        option.classList.remove("selected");
      }
    });

    // Save the selected answer to localStorage
  }

  // Mark selected answers on page load
  markSelectedAnswers();

  function markSelectedAnswers() {
    const questionDivs = document.querySelectorAll(".question");

    questionDivs.forEach((questionDiv, questionNumber) => {
      const savedAnswer = localStorage.getItem(`answer_${questionNumber + 1}`);
      if (savedAnswer) {
        const options = questionDiv.querySelectorAll(".option-button");
        let selectedOption;
        const qNosButton = qNosRight.querySelector(
          `.q-nos-right:nth-child(${questionNumber + 1})`
        );
        if (qNosButton) {
          qNosButton.classList.toggle("q-nos-selected");
        }
        options.forEach((option) => {
          if (option.textContent.trim() === savedAnswer.trim()) {
            selectedOption = option;
          }
        });

        if (selectedOption) {
          selectedOption.classList.add("selected");
        }
      }
    });
  }

  const clearbtn = document.getElementById("Clear-btn");

  clearbtn.addEventListener("click", () => {
    const checkclearopt = confirm("Are you sure to clear all options?");
    if (checkclearopt) {
      localStorage.clear();
      location.reload();
      // alert("All Options are cleared.");
    }
  });

  const generateTxtButton = document.getElementById("Submit-btn");
  generateTxtButton.addEventListener("click", function () {
    generateTxtFile();
  });

  function generateTxtFile() {
    // Your logic to collect options vs questions marked
    const optionsVsQuestions = getOptionsVsQuestions();

    // Create a Blob with the data
    const blob = new Blob([optionsVsQuestions], { type: "text/plain" });

    // Create a link to download the file
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "options_vs_questions.txt";

    // Append the link to the document and trigger a click
    document.body.appendChild(a);
    a.click();

    // Remove the link from the document
    document.body.removeChild(a);
  }

  function getOptionsVsQuestions() {
    // Your logic to collect options vs questions marked
    // For example, you can iterate through the questions and check the selected options
    let result = "";

    for (let i = 1; i <= TOTAL_QS_NO; i++) {
      const selectedAnswer = localStorage.getItem(`answer_${i}`);
      result += `Question ${i}: ${
        selectedAnswer ? `Option ${selectedAnswer}` : "Not answered"
      }\n`;
    }

    return result;
  }

  function isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  // Function to show or hide the alert based on the orientation
  function handleOrientationAlert() {
    const landscapeAlert = document.getElementById("landscapeAlert");

    if (!isLandscape()) {
      landscapeAlert.style.display = "block";
    } else {
      landscapeAlert.style.display = "none";
    }
  }

  // Initial check and event listener for orientation change
  handleOrientationAlert();
  window.addEventListener("orientationchange", handleOrientationAlert);
  window.addEventListener("resize", handleOrientationAlert);

  const selectPhotoBtn = document.getElementById("selectPhotoBtn");
  const photoInput = document.getElementById("photoInput");

  selectPhotoBtn.addEventListener("click", function () {
    photoInput.click();
  });
  const uploadedPic = document.getElementById("upload-placeholder");
  const uploadInputTextM = document.getElementById("uploadInputText-M");
  const uploadInputTextPC = document.getElementById("uploadInputText-PC");

  photoInput.addEventListener("change", function () {
    // Handle selected photo
    const selectedPhoto = photoInput.files[0];

    if (selectedPhoto) {
      const photoURL = URL.createObjectURL(selectedPhoto);
      console.log("Selected photo:", selectedPhoto.name);
      uploadedPic.src = photoURL;
      uploadedPic.style.filter = 'invert(0%)';
      // uploadInputTextM.innerText="File Saved \nTap again to Reupload";
      // uploadInputTextPC.innerText="File Saved \nClick again to Reupload";
      uploadInputTextM.innerText="Feature Coming Soon";
      uploadInputTextPC.innerText="Feature Coming Soon";
      // imageToText(photoURL);

    }
    
  });
}



// Function to perform OCR using Tesseract.js
// async function imageToText(imageUrl) {
//   try {
//       if (!imageUrl) {
//           throw new Error('Image URL is missing.');
//       }

//       // Load the image using Tesseract.js
//       const result = await Tesseract.recognize(
//           imageUrl,
//           'eng',
//           {
//               logger: info => console.log(info) // Log progress information
//           }
//       );

//       console.log('Tesseract Result:', result);

//       if (!result || !result.data || !result.data.text) {
//           throw new Error('No text found in the image.');
//       }

//       // Extracted text
//       const extractedText = result.data.text.trim();

//       // Log the extracted text
//       console.log('Extracted Text:', extractedText);

//       return extractedText;
//   } catch (error) {
//       console.error('Error:', error.message || error);
//       throw new Error('Error processing image.');
//   }
// }

// // Example usage
// const imageUrl = 'https://source.unsplash.com/user/c_v_r/1900x800'; // Replace with the actual URL of the image
// imageToText(imageUrl);

