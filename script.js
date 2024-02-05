const qNosRight = document.querySelector(".q-nos-right");

for (let i = 1; i <= 100; i++) {
  const button = document.createElement("a");
  button.href = "#";
  button.className = "q-nos-right";
  button.textContent = i;
  qNosRight.appendChild(button);
}

document.addEventListener('DOMContentLoaded', function () {
    // Ask the user whether to clear local storage on each refresh
    const shouldClearLocalStorage = confirm("Do you want to clear local storage on each refresh?");
    
    if (shouldClearLocalStorage) {
        localStorage.clear();
        alert("Local storage has been cleared.");
    }

    const questionContainer = document.getElementById('questionContainer');

    // Generate questions with single selectable options (A, B, C, or D)
    for (let i = 1; i <= 100; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        // Display question number
        const questionNumber = document.createElement('span');
        questionNumber.textContent = `Q${i}: `;
        questionDiv.appendChild(questionNumber);

        // Generate options A, B, C, and D
        for (let optionIndex = 0; optionIndex < 4; optionIndex++) {
            const optionButton = document.createElement('div');
            optionButton.className = 'option-button';
            optionButton.textContent = String.fromCharCode(65 + optionIndex); // Convert ASCII code to letters (A, B, C, ...)

            // Attach a click event listener to each option
            optionButton.addEventListener('click', () => {
                selectOption(questionDiv, optionButton, i);
                console.log(`Answer for question ${i}: ${optionButton.textContent}`);
            });

            questionDiv.appendChild(optionButton);
        }

        questionContainer.appendChild(questionDiv);

        // Load saved answer for the question if available
        const savedAnswer = localStorage.getItem(`answer_${i}`);
        if (savedAnswer) {
            const selectedOption = questionDiv.querySelector(`.option-button[data-value="${savedAnswer}"]`);
            if (selectedOption) {
                selectOption(questionDiv, selectedOption, i);
            }
        }
    }

    // Function to handle selecting an option within a question
    function selectOption(questionDiv, selectedOption, questionNumber) {
        const options = questionDiv.querySelectorAll('.option-button');

        options.forEach((option) => {
            if (option !== selectedOption) {
                option.classList.remove('selected');
            }
        });

        selectedOption.classList.toggle('selected');

        // Save the selected answer to localStorage
        const selectedAnswer = selectedOption.textContent;
        localStorage.setItem(`answer_${questionNumber}`, selectedAnswer);
    }

    // Mark selected answers on page load
    markSelectedAnswers();

    function markSelectedAnswers() {
        const questionDivs = document.querySelectorAll('.question');

        questionDivs.forEach((questionDiv, questionNumber) => {
            const savedAnswer = localStorage.getItem(`answer_${questionNumber + 1}`);
            if (savedAnswer) {
                const selectedOption = questionDiv.querySelector(`.option-button[data-value="${savedAnswer}"]`);
                if (selectedOption) {
                    selectedOption.classList.add('selected');
                }
            }
        });
    }
});
