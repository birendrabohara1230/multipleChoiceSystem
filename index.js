import { questionAnswer } from "./data.js";

/* Global Variables */
let questionsWithOptionHTML = "";
let optionsHTML = "";
let questionNumber = 0;
let score = 0;
let selectedOptions = [];
let status;
let percentage;
let randomQuestions;
let numberOfRandomElements;
let randomIndices = [];

document.addEventListener("DOMContentLoaded", () => {
  /* Generating Random indices inorder to generate questions randomly */
  const getQuestionNumber = document.querySelector(".question-count");
  getQuestionNumber.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      const questionCount = parseInt(getQuestionNumber.value);
      generateQuestion(questionCount);
      document.querySelector(".result").innerHTML = "";
      setTimeout(calculateResult, 420000);
    }
  });

  
  /* Generate the questions */
  function generateQuestion(questionCount) {
    numberOfRandomElements = questionCount;
    while (randomIndices.length < numberOfRandomElements) {
      const randomIndex = Math.floor(Math.random() * questionAnswer.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }


    /* Getting randomly actual questions */
    randomQuestions = randomIndices.map((index) => questionAnswer[index]);
    randomQuestions.forEach((question) => {
      questionNumber += 1;
      questionsWithOptionHTML += `
      <div class="question">    
          <div class="question-content">
            <div>
               <b>${questionNumber}) </b> ${question.qns} 
            </div>
          </div>
          <div class="options">
            <div class="option-gird">
            <input type="radio" name="q${questionNumber}" id="q${questionNumber}ida" value="${question.opt[0]}"> 
            <label for="q${questionNumber}ida">${question.opt[0]}</label>
            </div>
          <div  class="option-gird">
             <input type="radio" name="q${questionNumber}" id="q${questionNumber}idb"  value="${question.opt[1]}"> 
             <label for="q${questionNumber}idb">${question.opt[1]}</label>
          </div>
          <div  class="option-gird">
            <input type="radio" name="q${questionNumber}" id="q${questionNumber}idc"  value="${question.opt[2]}"> 
            <label for="q${questionNumber}idc">${question.opt[2]}</label>
          </div>
          <div  class="option-gird">
             <input type="radio" name="q${questionNumber}" id="q${questionNumber}idd"  value="${question.opt[3]}"> 
             <label for="q${questionNumber}idd">${question.opt[3]}</label>
          </div>
          </div>
      </div>
          `;
    });
    document.querySelector(".questions").innerHTML = questionsWithOptionHTML;
    questionsWithOptionHTML = "";
    questionNumber = 0;
    randomIndices = [];
    enableButton();
  }


  /* Calculate the Result when submit button is clicked */
  document.querySelector(".submit-button").addEventListener("click", () => {
    calculateResult();
  });


  /* Code to calculate calculate the result */
  function calculateResult() {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    let a = 0;
    for (let i = 0; i < radioInputs.length; i++) {
      if (radioInputs[i].checked) {
        selectedOptions.push(radioInputs[i].value);
      } else {
        selectedOptions.push(null);
      }
    }
    let j = 0;
    let k = 0;
    for (k = 0; k < selectedOptions.length; k++) {
      if (selectedOptions[k] === randomQuestions[j].ans) {
        score += 1;
      }
      if ((k + 1) % 4 === 0) {
        j += 1;
      }
    }



    /* Calculation of Status and Percentage */
    if (score < 0.4 * numberOfRandomElements) {
      status = "Fail";
      percentage = (score / numberOfRandomElements) * 100;
    } else if (score <= 0.6 * numberOfRandomElements) {
      status = "Pass";
      percentage = (score / numberOfRandomElements) * 100;
    } else if (score <= 0.7 * numberOfRandomElements) {
      status = "Good";
      percentage = (score / numberOfRandomElements) * 100;
    } else if (score <= 0.8 * numberOfRandomElements) {
      status = "Very Good";
      percentage = (score / numberOfRandomElements) * 100;
    } else if (score <= 0.9 * numberOfRandomElements) {
      status = "Excellent";
      percentage = (score / numberOfRandomElements) * 100;
    } else if (score <= 1.0 * numberOfRandomElements) {
      status = "OutStanding";
      percentage = (score / numberOfRandomElements) * 100;
    }
    document.querySelector(
      ".result"
    ).innerHTML = `You got ${score} out of ${numberOfRandomElements}. <br> Status: ${status}. <br>Percentage: ${percentage}%`;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    selectedOptions = [];
    randomIndices = [];
    score = 0;
    disableButtons();
  }



  /*Disable radio button and normal submit button after time out  */
  function disableButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((button) => {
      button.disabled = true;
    });

    const normalButtons = document.querySelectorAll("button");
    normalButtons.forEach((button) => {
      button.disabled = true;
    });
  }
});



/* Enable submit button */
function enableButton() {
  const normalButtons = document.querySelectorAll("button");
  normalButtons.forEach((button) => {
    button.disabled = false;
  });
}
