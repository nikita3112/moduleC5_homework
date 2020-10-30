const btn = document.querySelector('#button');
const number = document.querySelector('#number');
const limit = document.querySelector('#limit');
const container = document.querySelector('.container');

function validateInputs(number) {
  if (number >= 1 && number <= 10) {
    return true;
  }
  else {
    return false;
  }
};

if (localStorage.getItem('data')) {
  createHtml(JSON.parse(localStorage.getItem('data')));
}

function createHtml(data) {
  let res = ``;
  data.forEach((el) => {
    res += `
<div>
  <img class="image" src="${el.download_url}">
  <p>${el.author}</p>
</div>
`;
  });
  container.innerHTML = res;
};

function getRequest(number, limit) {
  fetch(`https://picsum.photos/v2/list?page=${number}&limit=${limit}`)
    .then((response) => {
      const result = response.json();
      return result;
  })
    .then((data) => {
      localStorage.setItem('data', JSON.stringify(data));
      createHtml(data);
  })
    .catch(() => {console.log('error')})
};

btn.addEventListener('click', function() {
  if (validateInputs(number.value) && validateInputs(limit.value)) {
    localStorage.clear();
    getRequest(number.value, limit.value);
  }
  else if (!validateInputs(number.value) && !validateInputs(limit.value)) {
    let HTML = `Номер страницы и лимит вне диапазона от 1 до 10`;
    container.innerHTML = HTML;
  }
  else if (!validateInputs(number.value)) {
    let HTML = `Номер страницы вне диапазона от 1 до 10`;
    container.innerHTML = HTML;
  }
  else if (!validateInputs(limit.value)) {
    let HTML = `Лимит вне диапазона от 1 до 10`;
    container.innerHTML = HTML;
  }
});