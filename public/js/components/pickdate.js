/**
 * Clase PickDate
 * Selección de fechas
 * @extends HTMLElement
 */
class PickDate extends HTMLElement {
    //Constructor
    constructor() {
        super();
        this.render();
    }

    //Renderiza el HTML del componente
    render() {
        this.innerHTML = `<label for="date"></label>
<input type="date" name="date">`;
        // this.querySelector("#date").valueAsDate = new Date();
    }
}

//Definimos el componente personalizado
customElements.define("pick-date", PickDate);