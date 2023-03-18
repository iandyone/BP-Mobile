// import '@scss/style.scss';
import '@css/style.css';

const rates = document.querySelector('.rates');
const ratesItems = document.querySelectorAll('.rates__item');
const mainButton = document.querySelector(".main__button");


/* === CHOOSE THE RATE === */
rates.addEventListener('click', (e) => {
    const rate = e.target.closest('.rates__item');
    if (rate) {
        ratesItems.forEach(item => item.classList.add('blurred'));
        rate.classList.remove('blurred');
        mainButton.href = rate.dataset.link;
    }
})
