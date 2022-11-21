import { loadCountries, searchCountries } from "../js/load_countries.js";


const d = document;
const $inputSearch = d.querySelector(".input__search");

d.addEventListener("DOMContentLoaded",  (e) => {
     loadCountries();
})


d.addEventListener("keyup", e => {

    if (e.target == $inputSearch) {
        searchCountries(e);
    }
})