import { loadCountries, showCountries } from "../js/load_countries.js";
import { setTheme } from '../js/theme.js';
import { Pagination } from "./pagination.js";

const d = document;

const $inputSearch = d.querySelector(".input__search");
const $filterText = d.querySelector(".filter__text");
const $filterOptions = d.querySelector(".filter__options");
let $back = d.querySelector(".back__text");
let $moon = d.querySelector(".header__image");

let paginacion = new Pagination();
let arrayCountries;
let countriesCodeName = {};
let arrayTemp;
let stringSearch = "";

const filterCountries = (value) => {

    //Search
    stringSearch = "";
    $inputSearch.value = "";
    let filterValue = value
    $filterText.textContent = filterValue[0].toUpperCase() + filterValue.substring(1);
    $filterOptions.classList.toggle('show-filter');
    arrayTemp = [...arrayCountries].filter(el =>
        el.region.toLowerCase() === filterValue.toLowerCase());

    paginacion.updatePagination(arrayTemp, 8)
}

const getCountriesCode = () => {
    console.log(arrayCountries);
    for (let index = 0; index < arrayCountries.length; index++) {
        let name = arrayCountries[index].name;
        let code = arrayCountries[index].alpha3Code;
        countriesCodeName[code] = name;
    }
    sessionStorage.setItem("countriescode", JSON.stringify(countriesCodeName));
}


d.addEventListener("DOMContentLoaded", async (e) => {
    arrayCountries = await loadCountries();
    paginacion = new Pagination(
        0, 8, 8, 1,
        ".pagination__previous",
        ".pagination__next",
        ".pagination__text",
        arrayCountries,
        showCountries);
    paginacion.pagination()
    getCountriesCode();
    let theme = localStorage.getItem("theme");
    if (theme !== null) {
        setTheme(theme, [$back, $moon]);
    }

});

d.addEventListener("click", e => {

    const $filterRadio = d.querySelector(".filter__radio:checked");


    if (e.target === $filterText) {
        $filterOptions.classList.toggle('show-filter');
    }

    if (e.target === $filterRadio) {
        filterCountries($filterRadio.value);
    }

    if (e.target.matches(".country__image")) {

        let nameCountry = e.target.dataset.name.toLocaleLowerCase();
        let $details = arrayCountries.
            filter(el => el.name.toLocaleLowerCase() === nameCountry);
        localStorage.setItem(
            "country", JSON.stringify($details[0])
        )
        // location.href = `pages/detail.html?=name=${nameCountry}`;
        open(`pages/detail.html?=name=${nameCountry}`, '_blank')
    }

});



d.addEventListener("keyup", e => {

    if (e.target == $inputSearch) {

        d.querySelector(".filter__text").textContent = "Filter by Region";

        let regExp = /[a-zA-Z]/ig;

        if (e.key === "Backspace") {
            stringSearch = stringSearch.substring(0, stringSearch.length - 1);
        }

        if (regExp.test(e.key) && e.key.length === 1) {
            stringSearch += e.key;
        }

        arrayTemp = [...arrayCountries].filter(el => el.name.toLocaleLowerCase().includes(stringSearch.toLowerCase()));

        if (stringSearch === "") {
            arrayTemp = [...arrayCountries];
        }


        paginacion.updatePagination(arrayTemp, 8);
    }
})
