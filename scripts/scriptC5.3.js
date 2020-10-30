const input = document.querySelector('.input');
const button = document.querySelector('.button');
const container = document.querySelector('.container');
const text1 = `
  <h1 class="text">
  число вне диапазона 1 - 10
</h1>
`

function useRequest(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    }
    else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img src="${item.download_url}" class="card-image"/>
        <p>${item.author}</p>
      </div>
    `;
    
    cards += cardBlock;
  });
  
  container.innerHTML = cards;
};

button.addEventListener('click', () => {
  const number = input.value;
  if (number > 10) {
    container.innerHTML = text1;
  }
  else if (number == '') {
    null;
  }
  else {
    useRequest(`https://picsum.photos/v2/list?limit=${number}`, displayResult);
  }
})