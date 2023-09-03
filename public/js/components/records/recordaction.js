import { apiURL } from "../../config.js";
import userSession from "../../session.js";

/**
 * Clase RecordAction
 * Registra las entradas y salidas
 * @extends HTMLElement
 */
class RecordAction extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    //Renderiza el HTML del componente
    async render() {
        const lastRecord = await this.getLastRecord();
        let action;
        let recordBtn = "Entrar";
        let recordTxt = "No hay registros previos";
        this.innerHTML = `<img src="./src/imgs/loading.gif">`;

        if (lastRecord == null) {
            action = this.recordIn;
            recordBtn = "Entrar";
        } else if (lastRecord["end_record"] != null) {
            if (lastRecord["end_record"] != undefined) recordTxt = `<span class="text" style="color: red">Salida</span> <div class="text">${lastRecord["end_record"]}</div>`;
            action = this.recordIn;
            recordBtn = "Entrar";
        } else if (lastRecord["end_record"] == null) {
            recordTxt = `<span class="text" style="color: green">Entrada</span>
            <div class="text">${lastRecord["begin_record"]}</div>`;
            action = this.recordOut;
            recordBtn = "Salir";
        }
        this.innerHTML = `<div class="record-container">
        <h2>${userSession.name}</h2>
        <div>Último registro:</div>
        ${recordTxt}
        <button id="record" class="btn btn-large" record-in>${recordBtn}</button>
</div>`;
        this.querySelector("#record").addEventListener("click", action.bind(this));

    }

    //Obtenemos el último registro
    async getLastRecord() {
        const controller = `last`;

        const url = `${apiURL}/record/${controller}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.status == 204) {
            return null;
        }

        const record = await response.json();

        return record.data;
    }

    //Registrar una entrada
    async recordIn() {
        const url = `${apiURL}/record/in`;

        const response = await fetch(url, {
            method: 'POST'
        });

        if (response.status == 200) {
            // console.log("Entrada con éxito")
            this.render();
        }
    }

    //Registrar una salida
    async recordOut() {
        const url = `${apiURL}/record/out`;

        const response = await fetch(url, {
            method: 'PUT'
        });

        if (response.status == 200) {
            // console.log("Salida con éxito")
            this.render();
        }
    }
}

customElements.define("record-action", RecordAction);