import { apiURL, roles } from "../../config.js";
import userSession from "../../session.js";
import { Forbidden } from "../../views/forbidden.js";

/**
 * Clase RecordTable
 * Tabla de registros
 * @extends HTMLElement
 */
class RecordTable extends HTMLElement {
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

        const url = `${apiURL}/record/${controller}`;
        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.status == 401) {
            this.innerHTML = Forbidden;
            return;
        } else if (response.status == 204) {
            this.innerHTML = `
            <div class="dates-container">
            <span>Desde:</span><pick-date date-start></pick-date>
            <span>Hasta:</span><pick-date date-end></pick-date>
            <button id="dates-filter" class="btn">Filtrar</button>
            </div>
            <h3>No se han encontrado registros</h3>`;

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

        const dataTable = data.map((element) => `<tr id="${element.id_user}">
    <td data-label="Fecha" class="date">${element.date_record}</td>
    <td data-label="Nombre" class="name">${element.name_user}</td>
    <td data-label="Apellidos" class="last-name">${element.last_name_user}</td>
    <td data-label="DNI" class="dni">${element.dni_user}</td>
    <td data-label="Entrada" class="begin_record">${element.begin_time}</td>
    <td data-label="Salida" class="end_record">${element.end_time ?? "-"}</td>
    <td data-label="Total" class="total">${element.row_total ?? '-'}</td>
    <td>
        ${userSession.id == element.id_user ?
                `<a href="#recordform/${element.id_record}" action><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>Editar</title>
                <path fill="green"
                    d="M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M12.5 7V12.2L16.5 14.6L15.5 15.6L11 13V7H12.5M11 21.9C5.9 21.4 2 17.1 2 12C2 6.5 6.5 2 12 2C17.3 2 21.6 6.1 22 11.3C21.7 11.2 21.4 11.1 21 11.1C20.6 11.1 20.3 11.2 20 11.3C19.6 7.2 16.2 4 12 4C7.6 4 4 7.6 4 12C4 16.1 7.1 19.5 11.1 19.9L11 20.1V21.9Z" />
            </svg></a>`
                : ""}
    </td>
</tr>`);

        this.renderTable(dataTable.join(""), data[0].total, dates);
    }

    //Renderiza la tabla
    async renderTable(data, total, dates) {
        let tFooter = "";
        if (total != undefined) {
            tFooter = `<tfoot">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style="color: green; font-weight: bold;">${total}</td>
              <td></td>
            </tr>
          </tfoot>  `;
        }

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
            <span>Registros por página</span>
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
                <th><a>Entrada</a></th>
                <th><a>Salida</a></th>
                <th><a class="sort" data-sort="total">Total</a></th>
                <th data-sortable="false">Acciones</th>
            </tr>
        </thead>
        <tbody class="list">
            ${data}
        </tbody>
        ${tFooter}
    </table>
    <div class="table-options">
        <span id="table-items"></span>
        <ul class="paginationBottom"></ul>
    </div>

</div>`;

        if (dates) {
            this.querySelector("[date-start] input").valueAsDate = new Date(dates["start"]);
            this.querySelector("[date-end] input").valueAsDate = new Date(dates["end"]);
        }

        const options = {
            valueNames: ["date", "name", "last-name", "dni", "total"],
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

        this.querySelector("#table-items").innerHTML = `Total: ${userTable.items.length} registros`;
        this.querySelector("#dates-filter").addEventListener("click", function () {
            const dates = {
                start: this.querySelector("[date-start] input").value,
                end: this.querySelector("[date-end] input").value
            }
            this.render(this.userId, dates)
        }.bind(this));
    }
}

customElements.define("record-table", RecordTable);