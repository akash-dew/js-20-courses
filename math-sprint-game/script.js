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
// let timer;
// let timePlayed = 0;
// let baseTime = 0;
// let penaltyTime = 0;
// let finalTime = 0;
// let finalTimeDisplay = '0.0';

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
    equationObject = { value: equation, evaluated: true };
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
    equationObject = { value: equation, evaluated: false };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
  console.log(equationsArray)
}

// show gme page
function showGamePage(){ 
    countdownPage.hidden = true;
    gamePage.hidden = false;
 }

function equationsToDOM (){


  equationsArray.forEach((eq) => {
    let div = document.createElement('div')
    let h1 = document.createElement('h1')
    div.classList.add('item');
    h1.textContent = eq.value;

    div.appendChild(h1);
    itemContainer.appendChild(div);

  })

  
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
    populateGamePage()
    setTimeout(showGamePage, 400);
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




// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDOM();

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
 

}

let scrollYs = 0;
// Scroll and Store use value
function select(guessedTrue){
  console.log(playerGuessArray)
  if(playerGuessArray.length <= questionAmount){
    scrollYs += 80;
    itemContainer.scroll(0, scrollYs);
    return guessedTrue ? playerGuessArray.push(true) : playerGuessArray.push(false) 
  }else{
    console.log(playerGuessArray.length +' hhhhhh'+ questionAmount)
  }
  
}


let timer;
let time = 0;
let penaltyTime = 0;
let totalTime = 0;


function timeStart(){
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', timeStart)
}

function addTime(){
  time += 0.1;
  if(playerGuessArray.length == questionAmount){
    window.clearInterval(timer);
    equationsArray.forEach((eq, index) => {
       
        if(eq.evaluated !== playerGuessArray[index]){
          penaltyTime += 0.5;
        }

    });
    totalTime = time + penaltyTime;
    resulToDom();
    // console.log(' time  ' + time + ' ---- panelty  ' + penaltyTime + '---- Totaltime  ' + totalTime)

  }

}


function resulToDom(){
   finalTimeEl.textContent =  totalTime.toFixed(1);
   baseTimeEl.textContent = 'Base Time : ' + time.toFixed(1);
   penaltyTimeEl.textContent = 'Penalty Time : ' + penaltyTime.toFixed(1);

 
   setTimeout(() => {
    playAgainBtn.hidden = false
   }, 1500);
  
  showResultPage();
}

function showResultPage(){
  gamePage.hidden = true
  scorePage.hidden = false
}

function playAgain(){
  gamePage.addEventListener('click', timeStart)
  scorePage.hidden = true;
  splashPage.hidden = false;
  playAgainBtn.hidden = true;
  
  timer;
  time = 0;
  penaltyTime = 0;
  totalTime = 0;
  
  questionAmount = 0;
  playerGuessArray = [];
  equationsArray = [];
  scrollYs = 0;

  itemContainer.textContent = '';

  itemContainer.scrollTop = 0;

}



startForm.addEventListener('submit', selectQuestionAmount)
gamePage.addEventListener('click', timeStart)