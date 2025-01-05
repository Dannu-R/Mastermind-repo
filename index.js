const game_row = document.querySelector('#game');
const pegs = document.querySelector('#pegs')
const selector = document.querySelector('#selector');
const guess = document.querySelector('#guess');
const clear = document.querySelector('#clear');

const colors = ['#E74C3C', '#F4D03F', '#2ECC71', '#3498DB', '#FFFFFF', '#000000'];

let guesses = [];
let guess_num = 0;
let code = [];
let wb_pegs = [];

while (code.length<4) {
  const index = Math.floor((Math.random())*6);
  if (!code.includes(colors[index])) {
    code.push(colors[index]);
  }
}
console.log(code);

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result) return null; // Handle invalid cases
  return `#${result.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

for (let i=0; i<10; i++) {
  const row = document.createElement('div');
  const peg_row = document.createElement('div');
  row.classList.add('row');
  peg_row.classList.add('row')
  for (let n=0; n<4; n++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.backgroundColor = '#D3D3D3';
    row.append(block);
  }
  for (let n=0; n<4; n++) {
    const peg = document.createElement('div');
    peg.classList.add('peg');
    peg.style.backgroundColor = '	#D3D3D3';
    peg_row.append(peg);
  }

  game_row.append(row);
  pegs.append(peg_row);
}



function checkAccuracy(code, guessed) {
  black = 0
  white = 0
  guessed.forEach(guess => {
    if (code.includes(guess)) {
      if (guessed.indexOf(guess) == code.indexOf(guess)) {
        wb_pegs.push('#000000');
      } else {
        wb_pegs.push('#FFFFFF')
      }
    }
  });
}


let currentRow = [];
let blocks = []
for(let i=0; i<6; i++) {
  const color = document.createElement('div');
  color.classList.add('block');
  color.classList.add('color');
  color.style.backgroundColor = colors[i];
  color.addEventListener('click', function (e) {
    if (guesses.length != 4 && guess_num < 10) {
      const hexColor = rgbToHex(e.target.style.backgroundColor);
      if (!guesses.includes(hexColor))
      guesses.push(hexColor);
      currentRow = game_row.children[guess_num];

      blocks = Array.from(currentRow.children);
      blocks.forEach((color_guess, index) => {
          color_guess.style.backgroundColor = guesses[index];
      });
    }
  })
  selector.append(color);
}

clear.addEventListener('click', function () {
  guesses = [];
  blocks.forEach((color_guess) => {
    color_guess.style.backgroundColor = '#D3D3D3';
  });
})

guess.addEventListener('click', function () {
  if (guesses.length == 4 && guess_num < 11) {
    console.log(wb_pegs);
    currentRow.classList.add('guessed');
    checkAccuracy(code, guesses);
    const current_peg_row = pegs.children[guess_num];
    const pegss = Array.from(current_peg_row.children);
    for (let i=0; i<wb_pegs.length; i++) {
      pegss[i].style.backgroundColor = wb_pegs[i]
    }
    if (wb_pegs.length == 4 && !wb_pegs.includes('white')) {
      console.log(wb_pegs);
      console.log('twat')
      const overlay = document.querySelector('#overlay');
      overlay.classList.add('overlay');
      const popup = document.querySelector('#popup');
      popup.classList.add('active');
      const eog_text = document.querySelector('#eog_text');
      eog_text.innerText = 'Congrats!'
      popup.addEventListener('click', function () {
        location.reload();
      })
    }
    if (guess_num == 9) {
      console.log(wb_pegs);
      console.log('twat')
      const overlay = document.querySelector('#overlay');
      overlay.classList.add('overlay');
      const popup = document.querySelector('#popup');
      popup.classList.add('active');
      const eog_text = document.querySelector('#eog_text');
      eog_text.innerText = 'Oh no! You Lost!';
      popup.addEventListener('click', function () {
        location.reload();
      })
    }
    console.log(`${black}, ${white}`);
    guesses = [];
    wb_pegs = []
    guess_num += 1;
    console.log(guess_num);
    
  }
})