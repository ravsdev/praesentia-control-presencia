/**
 * Clase PraesentiaFooter
 * Pié de página
 * @extends HTMLElement
 */
class PraesentiaFooter extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    //Renderiza el HTML del componente
    render() {
        this.innerHTML = `<footer>Praesentia ©2023 - Raúl Vañes Sanz</footer>`;
    }
}

//Definimos el componente personalizado
customElements.define("prasentia-footer", PraesentiaFooter);