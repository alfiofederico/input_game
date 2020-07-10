const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


/* const words = [
  'hello',
  'tense',
  'goodnight',
  'carpet',
  'cilinder',
  'pineapple'
];
 */

async function getWord() {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=1`
  );

  const data = await res.json();
  return data[0];
}


let randomWord;

let score = 0;

let time = 15;



let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

/* function getRandomWord() {


  return words[Math.floor(Math.random() * words.length)];
} */



/* function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
 */

async function addWordToDom() {
  randomWord = await getWord();
  word.innerHTML = randomWord;
}


function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if(time < 15) {
    document.getElementById('difficulty').disabled = true;
  }

  if(time === 0) {
    document.getElementById('difficulty').disabled = false;
  }

  if ( time <= 5 ) {

    timeEl.style.color = "red";
    
    }

  if(time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time is Over!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDom();


text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if(insertedText === randomWord) {
    addWordToDom();
    updateScore();

    e.target.value = '';

    if(difficulty === 'hard') {
      time += 3;
    } else if(difficulty === 'easy') {
      time += 12;
    } else {
      time += 8;
    }



    updateTime();
  }
});


settingsBtn.addEventListener('click', () => 
  settings.classList.toggle('hide'));


settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
} );