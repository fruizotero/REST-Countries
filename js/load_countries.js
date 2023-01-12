
const docu = document;
const $countries = docu.querySelector(".countries");
const $templateCountry = docu.querySelector(".template-country").content;
const $fragmentCountries = docu.createDocumentFragment();


export const loadCountries = async (e) => {

    try {
        let res = await fetch("https://restcountries.com/v2/all?fields=name,topLevelDomain,alpha3Code,capital,subregion,region,population,borders,nativeName,flags,currencies,languages");
        let json = await res.json();

        if (!res.ok)
            throw { status: res.status, statusText: res.statusText };

        return json;

    } catch (error) {

        console.log(error);

    }

}



export const showCountries = (elements = []) => {
    const $countryImage = $templateCountry.querySelector(".country__image");
    const $countryName = $templateCountry.querySelector(".country__name");
    const $countryPopulation = $templateCountry.querySelector(".country__population");
    const $countryRegion = $templateCountry.querySelector(".country__region");
    const $countryCapital = $templateCountry.querySelector(".country__capital");

    for (let index = 0; index < elements.length; index++) {
        let name = elements[index].name;
        $countryImage.setAttribute("src", elements[index].flags.svg);
        $countryImage.dataset.name = name;
        $countryName.textContent = name.length > 20 ? `${name.substring(0, 20)}...` : name;
        $countryPopulation.textContent = elements[index].population;
        $countryRegion.textContent = elements[index].region;
        $countryCapital.textContent = elements[index].capital;

        let $clone = docu.importNode($templateCountry, true);
        $fragmentCountries.appendChild($clone);
    }

    $countries.replaceChildren($fragmentCountries);

}
