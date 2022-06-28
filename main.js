const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const soundWord = document.querySelector('#sound');
let searchBtn = document.querySelector('#btn-search');
let result = document.querySelector('.result');

searchBtn.onclick = function () {
       let inpWord = document.querySelector('#word-search').value;
       fetch(`${url}${inpWord}`)
              .then((result) => result.json())
              .then((data) => {
                     result.innerHTML = `
                     <div class="word-standard">
                <h3 class="word-result">${inpWord}</h3>
                <button class="click-btn" onclick="playSound()"><i class="fa fa-volume-up"></i></button>
            </div>
            <div class="word-pos">
                <p class="word-sort">${data[0].meanings[0].partOfSpeech}</p>
                <p class="main-pos"> ${data[0].phonetics[1].text} </p>
            </div>
            <div class="word-meaning">
                <p>${data[0].meanings[0].definitions[0].definition}</p>
            </div>
            <div class="word-example">
                <p>${
                       data[0].meanings[0].definitions[0].example ||
                       'No Example For This Word'
                }</p>
            </div>
                     `;
                     soundWord.src = `${data[0].phonetics[0].audio}`;
              })
              .catch(() => {
                     result.innerHTML = `<h3 class="error">Couldn't Find This Word</h3>`;
              });
};
function playSound() {
       soundWord.play();
}
