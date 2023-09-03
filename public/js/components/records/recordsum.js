import { apiURL } from "../../config.js";
import userSession from "../../session.js";

/**
 * Clase RecordSum
 * Muestra el total de horas trabajadas
 * @extends HTMLElement
 */
class RecordSum extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    
    //Renderiza el HTML del componente
    async render() {
        const totalHours = await this.getTotalHours();
        this.innerHTML=totalHours['total'] ?? "0";
    }

    //Obtenemos las horas de la base de datos
    async getTotalHours() {
        const controller = `sumHours?hours=${this.getAttribute('hours')}`;

        const url = `${apiURL}/record/${controller}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.status == 204) {
            return null;
        }

        const records = await response.json();

        return records;
    }
}

customElements.define("record-sum", RecordSum);