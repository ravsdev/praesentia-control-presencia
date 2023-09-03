import { apiURL, roles } from "../../config.js";
import userSession from "../../session.js";

/**
 * Clase LatestUserTable
 * Tabla de los últimos usuarios añadidos a la base de datos
 * @extends HTMLElement
 */
class LatestUserTable extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="loading-container"><img src="./src/imgs/loading.gif"></div>`;
        this.render();
    }

    //Renderiza el HTML del componente
    async render() {
        const url = `${apiURL}/user/getLatest?select=id_user,name_user,last_name_user,dni_user,email_user,role_user,active_user&latest=${this.getAttribute("num")}`;  

        const response = await fetch(url + "", {
            method: 'GET'
        });
        
        if(response.status == 204){
            this.innerHTML = `<h3>No se han encontrado registros</h3>`;
            return;
        }
        const data = await response.json();

        const dataTable = data.map((element) =>`<tr id="${element.id_user}">
    <td data-label="Nombre" class="name">${element.name_user}</td>
    <td data-label="Apellidos" class="last-name">${element.last_name_user}</td>
    <td data-label="DNI" class="dni">${element.dni_user}</td>
    <td data-label="Email" class="email">${element.email_user}</td>
    <td data-label="Tipo" class="role">${roles[element.role_user]}</td>
    <td data-label="Estado" class="enabled">${element.active_user ? `<span style="color: green;">Activo</span>` : `<span
            style="color: red;">Inactivo</span>`}</td>
    <td data-label="Acciones" actions>
        ${userSession.role == "admin" ? `<a href="#userform/${element.id_user}" action><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Editar</title>
            <path fill="blue"
                d="M2 17V20H10V18.11H3.9V17C3.9 16.36 7.03 14.9 10 14.9C10.96 14.91 11.91 15.04 12.83 15.28L14.35 13.76C12.95 13.29 11.5 13.03 10 13C7.33 13 2 14.33 2 17M10 4C7.79 4 6 5.79 6 8S7.79 12 10 12 14 10.21 14 8 12.21 4 10 4M10 10C8.9 10 8 9.11 8 8S8.9 6 10 6 12 6.9 12 8 11.11 10 10 10M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.86 11.14 20.21 11.14 20.42 11.35L21.7 12.63C21.91 12.84 21.91 13.19 21.7 13.4M12 18.94L18.06 12.88L20.11 14.88L14.11 20.95H12V18.94" />
        </svg></a>` : ""}
        <a href="#records/${element.id_user}" action><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Registros</title>
            <path fill="green"
                d="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z" />
        </svg></a>
        <a href="#incidents/${element.id_user}" action><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>alert-outline</title>
            <path fill="red"
                d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
        </svg></a>
    </td>
</tr>`
        );

        this.renderTable(dataTable.join(""));
    }

    async renderTable(data) {
        this.innerHTML = `<div id="table-container" style="margin-top: 1rem;">
    <table id="users-table">
        <thead>
            <tr>
                <th><button class="sort" data-sort="name">Nombre</button></th>
                <th><button class="sort" data-sort="last-name">Apellidos</button></th>
                <th><button class="sort" data-sort="dni">DNI</button></th>
                <th><button class="sort" data-sort="email">E-mail</button></th>
                <th><button class="sort" data-sort="role">Tipo</button></th>
                <th><button class="sort" data-sort="enabled">Estado</button></th>
                <th data-sortable="false">Acciones</th>
            </tr>
        </thead>
        <tbody class="list">
            ${data}
        </tbody>
    </table>
    <div class="table-options">
        <span id="table-items"></span>
    </div>

</div>`;
        const options = {
            valueNames: ["name", "last-name", "dni", "email", "role", "enabled"]
        };

        const userTable = new List('table-container', options);
        this.querySelector("#table-items").innerHTML = `Últimos: ${userTable.items.length} empleados`;
    }
}

customElements.define("user-latest", LatestUserTable);