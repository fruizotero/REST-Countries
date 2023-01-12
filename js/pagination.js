const d = document;



export class Pagination {

    /**
     * 
     * @param {int} indexBegin Índice desde donde se comienza el bucle
     * @param {int} indexFinal Índice donde termina el bucle
     * @param {int} maxElementByPage Cantidad de elementos renderizados
     * @param {int} counter Contador de las páginas
     * @param {string} classButtonLeft Clase del html del botón atrás
     * @param {string} classButtonRight Clase del html del botón adelante
     * @param {string} classPaginationText Clase del html para indicar el número de página
     * @param {[]} arrayElements Son los elementos que se renderizarán
     * @param {function} functionRender  Función que se encarga de renderizar los datos del array
     */
    constructor(
        indexBegin = 0,
        indexFinal = 5,
        maxElementByPage = 5,
        counter = 1,
        classButtonLeft,
        classButtonRight,
        classPaginationText,
        arrayElements = [],
        functionRender = () => { }
    ) {
        this.indexBegin = indexBegin;
        this.indexFinal = indexFinal;
        this.maxElementByPage = maxElementByPage;
        this.counter = counter;
        this.totalPages = 0;
        this.classButtonLeft = classButtonLeft;
        this.classButtonRight = classButtonRight;
        this.classPaginationText = classPaginationText;
        this.arrayElements = arrayElements;
        this.functionRender = functionRender;
    }
    /**
     * 
     * @param {int} currentPage Página en la que se encuentra el usuario
     * @param {int} totalPages Cantidad de páginas totales
     *
     */
    paginationText(currentPage, totalPages) {

        d.querySelector(this.classPaginationText).textContent = `Página ${currentPage} de ${totalPages}`;
    }
    /**
     * 
     * @param {int} indexBegin 
     * @param {int} indexFinal 
     * @param {int} arrayElements 
     * @returns Devuelve un array de elementos según la indicación de los parámetros
     */
    elementsPage(indexBegin, indexFinal, arrayElements) {

        let elementsPage = [];
        for (let index = indexBegin; index < indexFinal; index++) {

            elementsPage.push(arrayElements[index]);
        }

        return elementsPage;

    }
    /**
     * 
     * @param {*} indexBegin 
     * @param {*} indexFinal 
     * @param {*} maxElementByPage 
     * @param {*} counter 
     * @param {*} arrayElements 
     * Función encargada de actualizar los valores cuando se entrega un nuevo array
     */
    setValues(indexBegin = 0, indexFinal = 8, maxElementByPage = 8, counter = 1, arrayElements = []) {
        this.indexBegin = indexBegin;
        this.indexFinal = indexFinal > arrayElements.length ? arrayElements.length : indexFinal;
        this.maxElementByPage = maxElementByPage > arrayElements.length ? arrayElements.length : maxElementByPage;
        this.counter = counter;
        this.totalPages = Math.ceil(arrayElements.length / maxElementByPage);
        this.arrayElements = arrayElements;
    }

    /**
     * 
     * @param {[]} arrayElements Array de elementos que se paginara
     * @param {int} elementsByPage Cantidad de elementos a mostrar por página. Éste será el nuevo valor en adelante
     */
    updatePagination(arrayElements, elementsByPage = 8) {
        this.arrayElements=arrayElements;
        this.setValues(
            0,
            this.arrayElements.length < elementsByPage ? this.arrayElements.length : elementsByPage,
            this.arrayElements.length < elementsByPage ? this.arrayElements.length : elementsByPage,
            1,
            arrayElements);
        this.functionRender(this.elementsPage(this.indexBegin, this.indexFinal, this.arrayElements));
        this.paginationText(this.counter, this.totalPages, this.classPaginationText);
    }

    /**
     * Función encargada de la paginación. Tiene los eventos de Click para el botón atrás y adelante.
     * Sólo utilizarla en el DOMContentLoaded porque causa problemas si se vuelve a invocar, si se ha de actualizar el array, utilizar la función updatePagination
     */
    pagination(
    ) {
        console.log(this.indexFinal);
        this.totalPages = Math.ceil(this.arrayElements.length / this.maxElementByPage);

        this.functionRender(this.elementsPage(this.indexBegin, this.indexFinal, this.arrayElements));
        this.paginationText(this.counter, this.totalPages, this.classPaginationText);

        d.addEventListener("click", e => {
            if (e.target.matches(this.classButtonLeft)) {
                if (this.counter > 1) {
                    this.counter--;
                    if (!(this.counter == this.totalPages - 1)) {
                        this.indexBegin -= this.maxElementByPage;
                        this.indexFinal -= this.maxElementByPage;
                        this.functionRender(this.elementsPage(this.indexBegin, this.indexFinal, this.arrayElements));
                    } else {
                        this.indexFinal = this.indexBegin;
                        this.indexBegin -= this.maxElementByPage;
                        this.functionRender(
                            this.elementsPage(this.indexBegin, this.indexFinal, this.arrayElements)
                        )
                    }
                }
                scrollTo(0, 0);
                this.paginationText(this.counter, this.totalPages, this.classPaginationText);
            }

            if (e.target.matches(this.classButtonRight)) {
                if (this.counter < this.totalPages) {

                    this.counter++;
                    if (!(this.counter === this.totalPages)) {
                        this.indexBegin += this.maxElementByPage;
                        this.indexFinal += this.maxElementByPage;
                        this.functionRender(this.elementsPage(this.indexBegin, this.indexFinal, this.arrayElements));
                    } else {

                        this.indexBegin = this.indexFinal;
                        this.indexFinal = this.arrayElements.length;

                        this.functionRender(
                            this.elementsPage(this.indexBegin, this.indexFinal, this.arrayElements)
                        );
                    }
                }
                scrollTo(0, 0);
                this.paginationText(this.counter, this.totalPages, this.classPaginationText);
            }

        });

    };

}
