import { Country } from "../js/model_country.js";

const docu = document;
const $countries = docu.querySelector(".countries");
const $templateCountry = docu.querySelector(".template-country").content;
const $fragmentCountries = docu.createDocumentFragment();
const $buttonPrev = docu.querySelector(".pagination__previous");
const $buttonNext = docu.querySelector(".pagination__next");
const $paginationText = docu.querySelector(".pagination__text");
const $filterText = docu.querySelector(".filter__text");
const $filterOptions = docu.querySelector(".filter__options");
const $inputSearch = docu.querySelector(".input__search");
const countriesFetch = [];
let countries = [];
let currentIndex = 0;
let limitElements = 8;
let counter = 1;
let totalPages;
let $detailsCountry;
let filterBoolean = false;
let searchBoolean = false;
let finalPage = false;
let filterValue = "";
let stringSearch = "";
let countriesCodeName = {};
// let sessionState = sessionStorage.getItem("state");

const resetPagination = () => {
    currentIndex = 0;
    limitElements = countries.length < 8 ? countries.length : 8;
    counter = 1;
    totalPages = Math.ceil(countries.length / 8);
}

export const loadCountries = async (e) => {

    try {
        let res = await fetch("https://restcountries.com/v2/all?fields=name,topLevelDomain,alpha3Code,capital,subregion,region,population,borders,nativeName,flags,currencies,languages");
        let json = await res.json();

        if (!res.ok)
            throw { status: res.status, statusText: res.statusText };

        json.forEach(element => {
            countriesFetch.push(new Country({ ...element }));
        });
        countries = [...countriesFetch];

        resetPagination();
        showCountries();
        // setBackState();

        for (let index = 0; index < countries.length; index++) {
            let name = countries[index].name;
            let code = countries[index].alpha3Code;
            countriesCodeName[code] = name;
        }
        sessionStorage.setItem("countriescode", JSON.stringify(countriesCodeName));

    } catch (error) {
        console.log(error);
    }

    return countries;

}



export const showCountries = () => {
    const $countryImage = $templateCountry.querySelector(".country__image");
    const $countryName = $templateCountry.querySelector(".country__name");
    const $countryPopulation = $templateCountry.querySelector(".country__population");
    const $countryRegion = $templateCountry.querySelector(".country__region");
    const $countryCapital = $templateCountry.querySelector(".country__capital");

    for (let index = currentIndex; index < limitElements; index++) {
        let name = countries[index].name;
        $countryImage.setAttribute("src", countries[index].flags.svg);
        $countryImage.dataset.name = name;
        $countryName.textContent = name.length > 20 ? `${name.substring(0, 20)}...` : name;
        $countryPopulation.textContent = countries[index].population;
        $countryRegion.textContent = countries[index].region;
        $countryCapital.textContent = countries[index].capital;

        let $clone = docu.importNode($templateCountry, true);
        $fragmentCountries.appendChild($clone);
    }

    $countries.replaceChildren($fragmentCountries);
    $paginationText.textContent = `Page ${counter} of ${totalPages}`

}

export const searchCountries = (e) => {

    filterBoolean = false;
    searchBoolean = true;

    let regExp = /[a-zA-Z]/ig;

    if (e.key === "Backspace") {
        stringSearch = stringSearch.substring(0, stringSearch.length - 1);
    }

    if (regExp.test(e.key) && e.key.length === 1) {
        stringSearch += e.key;
    }

    countries = countriesFetch.filter(el => el.name.toLocaleLowerCase().includes(stringSearch.toLowerCase()));
    // if (!(sessionState))
    resetPagination();
    showCountries()

}

const filterCountries = (value) => {
    //Search
    stringSearch = "";
    $inputSearch.value = "";
    searchBoolean = false;
    //Search
    filterBoolean = true;
    filterValue = value
    $filterText.textContent = filterValue[0].toUpperCase() + filterValue.substring(1);
    $filterOptions.classList.toggle('show-filter');
    countries = countriesFetch.filter(el =>
        el.region.toLowerCase() === filterValue.toLowerCase());
    // if (!(sessionState))
    resetPagination();
    showCountries();
}



docu.addEventListener("click", e => {

    const $filterRadio = docu.querySelector(".filter__radio:checked");

    // const $country = docu.querySelector("");

    if (e.target === $filterText) {
        $filterOptions.classList.toggle('show-filter');
    }

    if (e.target === $filterRadio) {
        filterCountries($filterRadio.value);
    }

    if (e.target.matches(".country__image")) {

        let nameCountry = e.target.dataset.name.toLocaleLowerCase();
        let $details = countriesFetch.
            filter(el => el.name.toLocaleLowerCase() === nameCountry);
        localStorage.setItem(
            "country", JSON.stringify($details[0])
        )
        location.href = `pages/detail.html?=name=${nameCountry}`;
        // let stateVariables = backState();
        // sessionStorage.setItem("state", JSON.stringify(stateVariables));
    }

    if (e.target === $buttonPrev) {
        if (currentIndex !== 0 && limitElements !== 8) {
            if (finalPage) {
                limitElements -= (countries.length % 8);
                finalPage = false;
            } else {
                limitElements -= 8;
            }
            currentIndex -= 8;
            counter--;
            showCountries();
        }
    }

    if (e.target === $buttonNext) {
        if (limitElements < countries.length && counter < totalPages) {
            currentIndex = limitElements;
            limitElements += 8;
            counter++;
            if (limitElements > countries.length) {
                limitElements = countries.length;
                finalPage = true;
            }
            showCountries();
        }
    }

});

window.addEventListener('popstate', function (event) {
    alert('you click on back or forward button');
});