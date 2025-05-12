
const cardTemplate = document.querySelector('#card-template').content;
const container = document.querySelector('.content');
const contextArea = document.querySelector('.context__area');

// const loadData = async () => {
    
// }

fetch('data.json')
  .then(res => {
    return res.json()
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
        container.append(createCard(data[i]));
    }
  })
  .catch(er => {
    console.log(er);
  })

container.addEventListener('click', (evt) => {
   if(evt.target.closest('.remove__button')){
      evt.target.closest('.card').remove();
   }
})



container.addEventListener('change', (evt) => {
  if(evt.target.closest('.card__checkbox')){
    const button = contextArea.querySelector('.context__button_is-active');
    setTimeout(() => {
      checkedCard(button);
    }, 400);
  }
})


contextArea.addEventListener('click', (evt) => {
  const button = evt.target.closest('.context__button');
  if (!button) return;
  // Удаляем активный класс у всех кнопок
  contextArea.querySelectorAll('.context__button').forEach(btn => {
    btn.classList.remove('context__button_is-active');
  });
  button.classList.add('context__button_is-active');
  
  checkedCard(button)
  
})

const createCard = (el) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardLogo = cardElement.querySelector('.card__image');
    const cardName = cardElement.querySelector('.card__header');
    const cardDescription = cardElement.querySelector('.card__article');
    cardLogo.src = el.logo;
    cardName.textContent = el.name;
    cardDescription.textContent = el.description;
    return cardElement
}

const checkedCard = (button) => {
  const cards = container.querySelectorAll('.card');
  const filterType = button.textContent.trim();

  cards.forEach(card => {
    const isChecked = card.querySelector('.card__checkbox').checked;
    const shouldShow =
      filterType === 'All' ||
      (filterType === 'Active' && isChecked) ||
      (filterType === 'Inactive' && !isChecked);
    
    card.classList.toggle('card__disable', !shouldShow);
  });
}


