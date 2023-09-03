import { apiURL, roles } from "../../config.js";

/**
 * Clase LatestIncidentTable
 * Tabla de las últimas incidencias
 * @extends HTMLElement
 */
class LatestIncidentTable extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="loading-container"><img src="./src/imgs/loading.gif"></div>`;
        this.render();
    }

    //Renderiza el HTML del componente
    async render() {
        const url = `${apiURL}/incident/getLatest&latest=${this.getAttribute("num")}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        if(response.status != 200){
            this.innerHTML = `<h3>No se han encontrado incidencias</h3>`;
            return;
        }
        const data = await response.json();
        // console.log(data)
        const dataTable = data.map((element) => `
        <tr id="${element.id_user}">
            <td class="date">${element.date_record}</td>
            <td class="name">${element.name_user}</td>
            <td class="last-name">${element.last_name_user}</td>
            <td class="dni">${element.dni_user}</td>
            <td class="begin_record">${element.begin_time}</td>
            <td class="end_record">${element.end_time}</td>
            <td class="description">${element.description_incident}</td>
            <td class="original_begin">${element.original_begin}</td>
            <td class="original_end">${element.original_end}</td>
        </tr>`);
        this.renderTable(dataTable.join(""));
    }

    //Renderiza la tabla
    async renderTable(data) {
        this.innerHTML = `<div id="table-container">
    <table id="users-table">
        <thead>
            <tr>
                <th><button class="sort" data-sort="date">Fecha</button></th>
                <th><button class="sort" data-sort="name">Nombre</button></th>
                <th><button class="sort" data-sort="last-name">Apellidos</button></th>
                <th><button class="sort" data-sort="dni">DNI</button></th>
                <th><button class="sort" data-sort="in">Entrada</button></th>
                <th><button class="sort" data-sort="out">Salida</button></th>                
                <th><span data-sort="description">Descripcion</span></th>                
                <th><button class="sort" data-sort="ori-in">Entrada original</button></th>                
                <th><button class="sort" data-sort="ori-out">Salida original</button></th>                
            </tr>
        </thead>
        <tbody class="list">
            ${data}
        </tbody>
    </table>
</div>`;
        const options = {
            valueNames: ["date","name", "last-name", "dni", "in", "out","description","ori-in","ori-out"]
        };
        
        const userTable = new List('table-container', options);
    }
}

customElements.define("latest-incidents", LatestIncidentTable);