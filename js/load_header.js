export const loadHeader = async () => {

    try {
        let res = await fetch("../pages/header.html");
        let headerHtml = await res.text();

        if (!res.ok) {
            throw { status: res.status, statusText: res.statusText }
        }
        document.querySelector(".header").innerHTML = headerHtml;
        console.log(headerHtml);
    } catch (error) {
        console.log(error);
    }
}