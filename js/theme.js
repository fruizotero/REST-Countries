const d = document;
let theme;

const lightMode = {
    "--background-color": "#fafafa",
    "--element-color": "#ffffff",
    "--text-color": "#111517",
    "--input-color": "#858585",
    "--option-filter": "#85858520",
    "--shadow-color": "#00000020"
}

const darkMode = {
    "--background-color": "#202c37",
    "--element-color": "#2b3945",
    "--text-color": "#ffffff",
    "--input-color": "#ffffff",
    "--option-filter": "#85858520",
    "--shadow-color": "transparent"
}

const setProperties = (properties = {}) => {
    Object.entries(properties).forEach(entry => {
        d.documentElement.style.setProperty(entry[0], entry[1]);
    })
}

export const setTheme = (value, imgs = []) => {

    let theme = value;
    if (theme === "dark") {
        setProperties(darkMode);
        imgs.forEach(el => {
            if (el !== null)
                el.classList.add("color-img");
        })
    }

    if (theme === "light") {
        setProperties(lightMode);
        imgs.forEach(el => {
            if (el !== null)
                el.classList.remove("color-img");
        })
    }
}

d.addEventListener("click", e => {
    console.log(e.target);
    let $back = d.querySelector(".back__text");
    let $moon = d.querySelector(".header__image");
    console.log($back);
    theme = localStorage.getItem("theme");
    if (e.target.matches(".header__image")) {
        if (theme === null) {
            setTheme("dark", [$back, $moon]);
            localStorage.setItem("theme", "dark");
        } else {
            if (theme === "dark") {
                setTheme("light", [$back, $moon]);
                localStorage.setItem("theme", "light");
            }
            if (theme === "light") {
                setTheme("dark", [$back, $moon]);
                localStorage.setItem("theme", "dark");
            }
        }


    }
})