const qNosRight = document.querySelector(".q-nos-right");

const TOTAL_QS_NO = 250

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
button.addEventListener('click', function () {
  setTimeout(() => {
    const questionDiv = document.getElementById(`question${i}`);
  // 
      // const questionDivprev2view = document.getElementById(`question${i-2}`);

    console.log(questionDiv)
    if (questionDiv) {
      const scrollPaddingTop = 5;
      const highlightDuration = 2000;

      questionDiv.scrollIntoView({
           behavior: 'smooth', 
           block: 'start',
         });
           questionDiv.style.border = '5px solid white'; // Adjust the border style as needed
           questionDiv.style.borderRadius = '5px'; // Adjust the border style as needed
           // Reset the border after the highlight duration
           setTimeout(() => {
             questionDiv.style.border = 'none';
           questionDiv.style.borderRadius = 'none'; // Adjust the border style as needed

           }, highlightDuration);
    }
  }, 100); // Adjust the delay if needed
  // questionDiv.classList.add("found");
});

  qNosRight.appendChild(button);
}
document.addEventListener("DOMContentLoaded", function () {
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
    const qNosButton = qNosRight.querySelector(`.q-nos-right:nth-child(${questionNumber})`);
    if (qNosButton) {
        qNosButton.classList.toggle('q-nos-selected');
    }
    
        console.log(qNosButton)

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
        const qNosButton = qNosRight.querySelector(`.q-nos-right:nth-child(${questionNumber+1})`);
        if (qNosButton) {
            qNosButton.classList.toggle('q-nos-selected');
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
});


const clearbtn = document.getElementById("Clear-btn");

clearbtn.addEventListener("click", () => {
    const checkclearopt = confirm("Are you sure to clear all options?")
    if (checkclearopt) {
        localStorage.clear();
        location.reload();
        // alert("All Options are cleared.");
    }

    
  
  });


  const generateTxtButton = document.getElementById('Submit-btn');
    generateTxtButton.addEventListener('click', function () {
      generateTxtFile();
    });
  
    function generateTxtFile() {
      // Your logic to collect options vs questions marked
      const optionsVsQuestions = getOptionsVsQuestions();
  
      // Create a Blob with the data
      const blob = new Blob([optionsVsQuestions], { type: 'text/plain' });
  
      // Create a link to download the file
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'options_vs_questions.txt';
  
      // Append the link to the document and trigger a click
      document.body.appendChild(a);
      a.click();
  
      // Remove the link from the document
      document.body.removeChild(a);
    }
  
    function getOptionsVsQuestions() {
      // Your logic to collect options vs questions marked
      // For example, you can iterate through the questions and check the selected options
      let result = '';
  
      for (let i = 1; i <= 100; i++) {
        const selectedAnswer = localStorage.getItem(`answer_${i}`);
        result += `Question ${i}: ${selectedAnswer ? `Option ${selectedAnswer}` : 'Not answered'}\n`;
      }
  
      return result;
    }



    function isLandscape() {
      return window.innerWidth > window.innerHeight;
    }
    
    // Function to show or hide the alert based on the orientation
    function handleOrientationAlert() {
      const landscapeAlert = document.getElementById('landscapeAlert');
    
      if (!isLandscape()) {
        landscapeAlert.style.display = 'block';
      } else {
        landscapeAlert.style.display = 'none';
      }
    }
    
    // Initial check and event listener for orientation change
    handleOrientationAlert();
    window.addEventListener('orientationchange', handleOrientationAlert);
    window.addEventListener('resize', handleOrientationAlert);