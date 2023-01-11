const d = document;



// let maxElementByPage = 5;
// let indexBegin = 0;
// let indexFinal = maxElementByPage;
// let counter = 1;

export class Pagination {


    constructor() {
        this.indexBegin = 0;
        this.indexFinal = 5;
        this.maxElementByPage = 5;
        this.counter = 1;
        this.totalPages = 0;
        this.arrayElements = [];
    }
    paginationText(currentPage, totalPages, classPaginationText) {

        d.querySelector(classPaginationText).textContent = `Página ${currentPage} de ${totalPages}`;
    }

    elementsPAge(indexBegin, indexFinal, arrayElements) {

        let elementsPage = [];

        for (let index = indexBegin; index < indexFinal; index++) {

            elementsPage.push(arrayElements[index]);
        }

        return elementsPage;

    }

    setValues(indexBegin, indexFinal, maxElementByPage, counter, arrayElements) {
        this.indexBegin = indexBegin;
        this.indexFinal = indexFinal;
        this.maxElementByPage = maxElementByPage;
        this.counter = counter;
        this.totalPages = Math.ceil(arrayElements.length / maxElementByPage);
        this.arrayElements = arrayElements;
    }

    pagination(
        arrayElements = [],
        classButtonLeft = "",
        classButtonRight = "",
        classPaginationText = "",
        callback = () => { }
    ) {
        this.arrayElements = arrayElements;
        this.totalPages = Math.ceil(this.arrayElements.length / this.maxElementByPage);

        callback(this.elementsPAge(this.indexBegin, this.indexFinal, this.arrayElements));
        this.paginationText(this.counter, this.totalPages, classPaginationText);

        d.addEventListener("click", e => {

            if (e.target.matches(classButtonLeft)) {
                console.log(this.arrayElements.length);
                if (this.counter > 1) {
                    this.counter--;
                    if (!(this.counter == this.totalPages - 1)) {
                        this.indexBegin -= this.maxElementByPage;
                        this.indexFinal -= this.maxElementByPage;
                        callback(this.elementsPAge(this.indexBegin, this.indexFinal, this.arrayElements));
                    } else {
                        this.indexFinal = this.indexBegin;
                        this.indexBegin -= this.maxElementByPage;
                        callback(
                            this.elementsPAge(this.indexBegin, this.indexFinal, this.arrayElements)
                        )
                    }
                }
                scrollTo(0, 0);
                this.paginationText(this.counter, this.totalPages, classPaginationText);
            }

            if (e.target.matches(classButtonRight)) {
                console.log(this.arrayElements.length);
                console.log(this.totalPages);
                if (this.counter < this.totalPages) {

                    this.counter++;
                    if (!(this.counter === this.totalPages)) {
                        this.indexBegin += this.maxElementByPage;
                        this.indexFinal += this.maxElementByPage;
                        callback(this.elementsPAge(this.indexBegin, this.indexFinal, this.arrayElements));
                    } else {

                        this.indexBegin = this.indexFinal;
                        this.indexFinal = this.arrayElements.length;

                        console.log(this.indexBegin);
                        console.log(this.indexFinal);
                        callback(
                            this.elementsPAge(this.indexBegin, this.indexFinal, this.arrayElements)
                        );
                    }
                }
                scrollTo(0, 0);
                this.paginationText(this.counter, this.totalPages, classPaginationText);
            }




        });




    };

}

// const paginationText = (currentPage, totalPages, classPaginationText) => {

//     d.querySelector(classPaginationText).textContent = `Página ${currentPage} de ${totalPages}`;
// }

// /**
//  *
//  * @param {int} indexBegin Indice de inicio del bucle
//  * @param {int} indexFinal Indice final del bucle
//  * @param {[]} arrayElements Array de donde se extraeran los elementos a devolver
//  * @returns Devuelve un array con los elementos indicados según los índices
//  */

// const elementsPAge = (indexBegin, indexFinal, arrayElements) => {

//     let elementsPAge = [];

//     for (let index = indexBegin; index < indexFinal; index++) {

//         elementsPAge.push(arrayElements[index]);
//     }

//     return elementsPAge;

// }

// /**
//  *
//  * @param {[]} arrayElements Array con los elementos a paginar
//  * @param {string} classButtonLeft Clase del DOM con el botón hacia la izquierda
//  * @param {string} classButtonRight Clase del DOM con el botón hacia la derecha
//  * @param {function} callback Función que se encargará de la renderización de los elementos, recibe el array indicado según los índices.
//  */
// export const pagination = (
//     arrayElements = [],
//     classButtonLeft = "",
//     classButtonRight = "",
//     classPaginationText = "",
//     callback = () => { },
//     options = {
//         "maxElementByPage": 5,
//         "indexBegin": 0,
//         "indexFinal": 5,
//         "counter": 1
//     }
// ) => {

//     let maxElementByPage = options["maxElementByPage"];
//     let indexBegin = options["indexBegin"];
//     let indexFinal = options["indexFinal"];
//     let counter = options["counter"];

//     let totalPages = Math.ceil(arrayElements.length / maxElementByPage);

//     callback(elementsPAge(indexBegin, indexFinal, arrayElements));
//     paginationText(counter, totalPages, classPaginationText);

//     d.addEventListener("click", e => {

//         if (e.target.matches(classButtonLeft)) {
//             console.log(arrayElements.length);
//             if (counter > 1) {
//                 counter--;
//                 if (!(counter == totalPages - 1)) {
//                     indexBegin -= maxElementByPage;
//                     indexFinal -= maxElementByPage;
//                     callback(elementsPAge(indexBegin, indexFinal, arrayElements));
//                 } else {
//                     indexFinal = indexBegin;
//                     indexBegin -= maxElementByPage;
//                     callback(
//                         elementsPAge(indexBegin, indexFinal, arrayElements)
//                     )
//                 }
//             }
//             scrollTo(0, 0);
//             paginationText(counter, totalPages, classPaginationText);
//         }

//         if (e.target.matches(classButtonRight)) {
//             console.log(arrayElements.length);
//             if (counter < totalPages) {

//                 counter++;
//                 if (!(counter === totalPages)) {
//                     indexBegin += maxElementByPage;
//                     indexFinal += maxElementByPage;
//                     callback(elementsPAge(indexBegin, indexFinal, arrayElements));
//                 } else {

//                     indexBegin = indexFinal;
//                     indexFinal = arrayElements.length;

//                     console.log(indexBegin);
//                     console.log(indexFinal);
//                     callback(
//                         elementsPAge(indexBegin, indexFinal, arrayElements)
//                     );
//                 }
//             }
//             scrollTo(0, 0);
//             paginationText(counter, totalPages, classPaginationText);
//         }




//     });




// };