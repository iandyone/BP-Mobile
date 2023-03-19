// import '@scss/style.scss';
import "@css/style.css";

const rates = document.querySelector(".rates");
const ratesItems = document.querySelectorAll(".rates__item");
const mainButton = document.querySelector(`.main__button`);


/* === CHOOSE THE RATE === */

rates.addEventListener("click", (e) => {
    const rate = e.target.closest(".rates__item");
    if (rate) {
        ratesItems.forEach(item => item.classList.add("blurred"));
        rate.classList.remove("blurred");
        mainButton.href = rate.dataset.link;
    }
})



/* === LANGUAGE === */

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const language = searchParams.get("lang") ?? "en";

const perMonthPrice = "9.99";
const perYearPrice = "19.99";
const monthlyRatePerMonthPrice = "9.99";
const yearlyRatePerMonthPrice = "1.66";

setAppLanguage(language);




/* === FUNCTIONS === */

async function getLocaliztion(language) {
    try {
        const data = await fetch(`./assets/localizations/${language}.json`);
        const json = await data.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function setAppLanguage(language) {
    const data = await getLocaliztion(language);
    const content = document.querySelectorAll("[data-type=content]");

    const perMonthType = "<strong>{{price}}</strong><br>per month";
    const perYearType = "<strong>{{price}}</strong><br>per year";
    const monthlyType = "{{price}}/month";

    const perMonthValue = data[perMonthType];
    const perYearValue = data[perYearType];
    const monthlyValue = data[monthlyType];

    content.forEach(element => {
        if (element.dataset.price) {
            const elementContentType = element.dataset.content;

            if (elementContentType === perMonthType) {
                element.innerHTML = perMonthValue.replace("<strong>{{price}}</strong>", `<span>$${perMonthPrice}</span>`);
            } else if (elementContentType === perYearType) {
                element.innerHTML = perYearValue.replace("<strong>{{price}}</strong>", `<span>$${perYearPrice}</span>`);
            } else if (elementContentType === monthlyType) {
                if (element.dataset.rate === "monthly") {
                    element.innerHTML = monthlyValue.replace("{{price}}", monthlyRatePerMonthPrice);
                } else if (element.dataset.rate === 'yearly') {
                    element.innerHTML = monthlyValue.replace("{{price}}", `${yearlyRatePerMonthPrice}`);
                }
            }
            return;
        }

        element.innerHTML = data[element.dataset.content];
        fixFonts(language);
    })
}

function fixFonts(language) {
    const rateTitles = document.querySelectorAll(".rate__title");
    
    if(language === "fr") {
        const rateTitleStyles = `
            max-width: 85px;
            line-height: 100%;
            margin-bottom: 8px;
        `;

        rateTitles.forEach(element => element.style = rateTitleStyles);
    }
}