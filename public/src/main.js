
// JSON파일로부터 데이터 받아오기
function loadItems(){
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items);
}

function displayItems(items){
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item){
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="thumbnail"/>
    <span class="txt">${item.gender}, ${item.size}</span>
  </li>
  `;
}

function onButtonClick(event, items){
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null){
    return;
  }

  const filtered = items.filter(item => item[key] === value);
  displayItems(filtered);

}

//버튼이 클릭되었을 때 필터링 기능 정의
function setEventListeners(items){
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

// main
loadItems()
.then(items => {
  displayItems(items);
  setEventListeners(items);
})
.catch(console.log);
