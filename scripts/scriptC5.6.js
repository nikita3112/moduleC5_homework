const btn = document.querySelector('.button');
const input1 = document.querySelector('.width-input');
const input2 = document.querySelector('.height-input');
const container = document.querySelector('.container');


function validateFormValues(value) {
  if (value >= 100 && value <= 300) {
    return true;
  }
  else {
    return false;
  }
};

function badInput() {
  let HTML = 
      `
    <p class="text">одно из чисел вне диапазона от 100 до 300</p>
    `;
  
  container.innerHTML = HTML;
};

function goodInput(width, height) {
  let HTML = ``;
  fetch(`https://picsum.photos/${width}/${height}`)
   .then((response) => {
      const result = response.url;
      return result;
    })
   .then((data) => {
      HTML += `<img src="${data}">`;
      container.innerHTML = HTML;
    })
   .catch(() => { console.log('error') });
}

btn.addEventListener('click', function() {
  if (validateFormValues(input1.value) && validateFormValues(input2.value)) {
    goodInput(input1.value, input2.value);
  }
  else {
    badInput();
  }
});