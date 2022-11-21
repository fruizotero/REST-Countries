export  class Country {

    constructor({
        name = "",
        topLevelDomain = [],
        alpha3Code = "",
        capital = "",
        subregion = "",
        region = "",
        population = 0,
        borders = [],
        nativeName = "",
        flags = {},
        currencies = [],
        languages = [],
    }) {
        this.name = name;
        this.topLevelDomain = topLevelDomain;
        this.alpha3Code = alpha3Code;
        this.capital = capital;
        this.subregion = subregion;
        this.region = region;
        this.population = population;
        this.borders = borders;
        this.nativeName = nativeName;
        this.flags = flags;
        this.currencies = currencies;
        this.languages = languages;
    }

    
}