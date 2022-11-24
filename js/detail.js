import { loadHeader } from "../js/load_header.js";
import { Country } from "./model_country.js";


const d = document;
const $templateButton = d.querySelector(".template-button").content;
const $fragnmentButtons = d.createDocumentFragment();
const $flag = d.querySelector(".details__image");
const $name = d.querySelector(".details__name");
const $nativeName = d.querySelector(".details__native__name");
const $population = d.querySelector(".details__population");
const $region = d.querySelector(".details__region");
const $subRegion = d.querySelector(".details__subregion");
const $capital = d.querySelector(".details__capital");
const $topLevelDomain = d.querySelector(".details__topleveldomain");
const $currencies = d.querySelector(".details__currencies");
const $languages = d.querySelector(".details__languages");
const $borders = d.querySelector(".details__borders");

let country;
let countriesCode;

const loadCountrie = async (name, code, isName) => {
    let countryFetch;
    let res;

    try {
        if (isName) {
            res = await fetch(`https://restcountries.com/v2/name/${name}`);
        } else {
            res = await fetch(`https://restcountries.com/v2/alpha/${code}`);
        }

        let json = await res.json();

        if (!res.ok) {
            throw { status: res.status, statusText: res.statusText };
        }

        if (isName) {
            json.forEach(el => countryFetch = new Country({ ...el }));
        } else {
            countryFetch = new Country({ ...json });
        }

    } catch (error) {
        console.log(error);
    }

    return countryFetch;
}



const loadDetails = async () => {

    let countryName = location.search.replace("?=name=", "");

    country = await loadCountrie(countryName.replace(/%20/ig, " "), "", true);

    $flag.setAttribute("src", country.flags.svg)
    $name.textContent = country.name;
    $nativeName.textContent = country.nativeName;
    $population.textContent = country.population;
    $region.textContent = country.region;
    $subRegion.textContent = country.subregion;
    $capital.textContent = country.capital;

    let tld = "";
    country.topLevelDomain.forEach((el, index) => {
        tld += el;
        if (!(index === country.topLevelDomain.length - 1)) {
            tld += ", "
        }
    });
    $topLevelDomain.textContent = tld;

    let currencies = "";
    country.currencies.forEach((el, index) => {
        currencies += el.name;
        if (!(index === country.currencies.length - 1)) {
            currencies += ", ";
        }
    });
    $currencies.textContent = currencies;

    let languages = "";
    country.languages.forEach((el, index) => {
        languages += el.name;
        if (!(index === country.languages.length - 1)) {
            languages += ", ";
        }
    });
    $languages.textContent = languages;


    for (let index = 0; index < country.borders.length; index++) {
        $templateButton.querySelector(".details__border").textContent = countriesCode[country.borders[index]];
        $templateButton.querySelector(".details__border").dataset.name = countriesCode[country.borders[index]];
        let $clone = d.importNode($templateButton, true);
        $fragnmentButtons.appendChild($clone);
    }


    $borders.replaceChildren($fragnmentButtons);
    console.log(country);
}

d.addEventListener("DOMContentLoaded", e => {
    countriesCode = JSON.parse(sessionStorage.getItem("countriescode"));
    loadHeader();
    loadDetails();
});

d.addEventListener("click", e => {

    console.log(
        e.target
    );

    if (e.target.matches(".back__text")) {
        history.back();
    }

    if (e.target.matches(".details__border")) {
        let nameCountry = e.target.dataset.name;
        location.href = `../pages/detail.html?=name=${nameCountry}`;
    }
});


