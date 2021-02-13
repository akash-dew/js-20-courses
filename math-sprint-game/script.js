// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

// Scroll
let valueY = 0;
 
// // Get Random Number up to a certain amount
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  console.log('correct equations:', correctEquations);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  console.log('wrong equations:', wrongEquations);
  // Loop through for each correct equation, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through for each wrong equation, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(2);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
}
 

// Display 3,2,1, Go
function countdownStart(){
  countdown.textContent = '3';
  setTimeout(()=>{
    countdown.textContent = '2';
  }, 1000)
  setTimeout(()=>{
    countdown.textContent = '1';
  }, 2000)
  setTimeout(()=>{
    countdown.textContent = 'Go!';    
  }, 3000)
}


function showCountdown(){
    splashPage.hidden = true;
    countdownPage.hidden = false;
    countdownStart();
    createEquations();
    createEquations();
}


// Get question Value 
function getRadioValue(e){
  let radioValue;
  radioInputs.forEach((item) =>{
    if(item.checked){
      radioValue = item.value
    }
  });
  return radioValue;
}


// From that decide the question 
function selectQuestionAmount(e){
  e.preventDefault();
  questionAmount = getRadioValue();
  console.log(questionAmount);
  if(questionAmount){
    showCountdown()
  }else{
    alert('select Questions')
  }
}


// Select question amount
startForm.addEventListener('click', () => {
  radioContainers.forEach((radioEL) => {
    radioEL.classList.remove('selected-label');

    if(radioEL.children[1].checked){
      radioEL.classList.add('selected-label');
    }
  })
});

startForm.addEventListener('submit', selectQuestionAmount)
