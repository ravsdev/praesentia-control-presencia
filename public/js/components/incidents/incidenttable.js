import { apiURL, roles } from "../../config.js";

/**
 * Clase IncidentTable
 * Tabla de incidencias
 * @extends HTMLElement
 */
class IncidentTable extends HTMLElement {
    constructor() {
        super();
        let content = location.hash;
        let params = content.split("/");
        this.userId = params[1];
        this.innerHTML = `<div class="loading-container"><img src="./src/imgs/loading.gif"></div>`;
        this.render(this.userId);
    }

    //Renderiza el HTML del componente
    async render(id, dates = null) {
        let controller = id == undefined ? "getAll" : `getUser?id_user=${this.userId}`;

        if (dates != null) {
            controller += controller.includes("?") ? "&" : "?";
            controller += `date_from=${dates.start}&date_to=${dates.end}`;
        }

        const url = `${apiURL}/incident/${controller}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        if(response.status != 200){
            this.innerHTML = `
            <div class="dates-container">
                <span>Desde:</span><pick-date date-start></pick-date>
                <span>Hasta:</span><pick-date date-end></pick-date>
                <button id="dates-filter" class="btn">Filtrar</button>
            </div>
            <h3>No se han encontrado incidencias</h3>`;
            this.querySelector("#dates-filter").addEventListener("click", function () {
                const dates = {
                    start: this.querySelector("[date-start] input").value,
                    end: this.querySelector("[date-end] input").value
                }
                this.render(this.userId, dates)
            }.bind(this));
            return;
        }
        const data = await response.json();
        
        const dataTable = data.map((element) => `
        <tr id="${element.id_user}">
            <td class="date">${element.date_record}</td>
            <td class="name">${element.name_user}</td>
            <td class="last-name">${element.last_name_user}</td>
            <td class="dni">${element.dni_user}</td>
            <td class="begin_record">${element.begin_time}</td>
            <td class="end_record">${element.end_time ?? "-"}</td>
            <td class="description">${element.description_incident ?? "-"}</td>
            <td class="original_begin">${element.original_begin}</td>
            <td class="original_end">${element.original_end ?? "-"}</td>
        </tr>`);
        this.renderTable(dataTable.join(""));
    }
    
    //Renderiza la tabla
    async renderTable(data) {
        this.innerHTML = `<div id="table-container">
        <div class="dates-container">
        <span>Desde:</span><pick-date date-start></pick-date>
        <span>Hasta:</span><pick-date date-end></pick-date>
        <button id="dates-filter" class="btn">Filtrar</button>
    </div>
    <div class="table-options">
        <div class="box">
            <select id="numPages" name="pages">
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
            <span>Incidencias por página</span>
        </div>
        <input class="search" placeholder="Buscar" />
    </div>
    <ul class="paginationTop"></ul>
    <table id="users-table">
        <thead>
            <tr>
                <th><a class="sort" data-sort="date">Fecha</a></th>
                <th><a class="sort" data-sort="name">Nombre</a></th>
                <th><a class="sort" data-sort="last-name">Apellidos</a></th>
                <th><a class="sort" data-sort="dni">DNI</a></th>
                <th><a class="sort" data-sort="in">Entrada</a></th>
                <th><a class="sort" data-sort="out">Salida</a></th>                
                <th><span data-sort="description">Descripcion</span></th>                
                <th><a class="sort" data-sort="ori-in">Entrada original</a></th>                
                <th><a class="sort" data-sort="ori-out">Salida original</a></th>                
            </tr>
        </thead>
        <tbody class="list">
            ${data}
        </tbody>
    </table>
    <div class="table-options">
        <span id="table-items"></span>
        <ul class="paginationBottom"></ul>
    </div>

</div>`;
        const options = {
            valueNames: ["date","name", "last-name", "dni", "in", "out","description","ori-in","ori-out"],
            page: this.querySelector("#numPages").value,
            pagination: [{
                name: "paginationTop",
                paginationClass: "paginationTop",
                outerWindow: 2,
                innerWindow: 2,
            }, {
                paginationClass: "paginationBottom",
                outerWindow: 2,
                innerWindow: 2,
            }]

        };
        
        const userTable = new List('table-container', options);
        this.querySelector("#numPages").addEventListener("change", function () {
            userTable["page"] = this.value;
            userTable.update();
        })
        this.querySelector("#table-items").innerHTML = `Total: ${userTable.items.length} incidencias`;
        this.querySelector("#dates-filter").addEventListener("click", function () {
            const dates = {
                start: this.querySelector("[date-start] input").value,
                end: this.querySelector("[date-end] input").value
            }
            this.render(this.userId, dates)
        }.bind(this));
    }
}

customElements.define("incident-table", IncidentTable);