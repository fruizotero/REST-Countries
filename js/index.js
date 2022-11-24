import { loadCountries, searchCountries } from "../js/load_countries.js";
import { setTheme } from '../js/theme.js';


const d = document;
const $inputSearch = d.querySelector(".input__search");
let $back = d.querySelector(".back__text");
let $moon = d.querySelector(".header__image");

d.addEventListener("DOMContentLoaded", (e) => {
    loadCountries();
    let theme = localStorage.getItem("theme");
    if (theme !== null) {
        setTheme(theme, [$back, $moon]);
    }

})


d.addEventListener("keyup", e => {

    if (e.target == $inputSearch) {
        searchCountries(e);
    }
})
