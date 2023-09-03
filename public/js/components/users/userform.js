import { apiURL, roles } from "../../config.js";
import { Forbidden } from "../../views/forbidden.js";
import userSession from "../../session.js";

/**
 * Clase UserForm
 * Formulario de usuario
 * @extends HTMLElement
 */
export class UserForm extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    //Renderiza el HTML del componente
    render() {
        this.modal = `<div id="openModal" class="modalDialog">
  <div>
    <button id="close-btn" title="Close" class="close">X</button>
    <div class="modalContent">
      <header>
        <h2 style="color:red;">¡Atención!</h2>
        <p>Se borrarán todos los registros asociados al usuario</p>
      </header>
      <div class="modalBtns">
        <button id="confirm-btn" class="btn btn-alert">Sí</button>
        <button id="cancel-btn" class="btn">No</button>
      </div>
    </div>
  </div>
</div>`;
        this.innerHTML = `${this.modal}
        <form id="user-form" method="POST">
    <div>
        <label for="name_user">Nombre</label>
        <input type="text" name="name_user" placeholder="Nombre" required>
    </div>
    <div>
        <label for="last_name_user">Apellidos</label>
        <input type="text" name="last_name_user" placeholder="Apellidos" required>
    </div>
    <div>
        <label for="dni_user">NIF/NIE</label>
        <input type="text" name="dni_user" placeholder="NIF/NIE" required>
    </div>
    <div>
        <label for="email_user">Correo</label>
        <input type="email" name="email_user" placeholder="E-Mail" required>
    </div>
    <div>
        <label for="password_user">Contraseña</label>
        <input type="password" name="password_user" placeholder="Contraseña" required>
    </div>
    <div class="check">
        <label for="active_user">Activo</label>
        <input type="checkbox" name="active_user" checked>
    </div>
    <div class="box">
        <label for="role_user">Tipo</label>
        <select name="role_user">
            <option value="1">${roles[1]}</option>
            <option value="2">${roles[2]}</option>
            <option value="3" selected="selected">${roles[3]}</option>
        </select>

    </div>
    <div class="button input-box">
        <input id="submit-form" type="button" value="Guardar"></input>
        <input id="delete-btn" class="btn-alert" type="button" value="Borrar"></input>
    </div>
    <div id="message"></div>
</form>`;
        let content = location.hash;
        let params = content.split("/");
        this.userId = params[1];
        this.error = "Error";
        let action = this.newUser;
        this.passChange = false;
        this.querySelector("[name=password_user]").addEventListener("change", function () {
            this.passChange = true;
        }.bind(this));

        if (this.userId) {
            this.getData(this.userId);
            action = this.updateUser;
        } else {
            //Si no es un administrador no puede acceder al formulario de crear nuevo usuario
            if(userSession.role != "admin"){
                this.innerHTML = Forbidden;
                return;
            }
            //Si es un usuario nuevo eliminamos el botón de borrar
            this.querySelector("#delete-btn").remove();
        }

        document.getElementById("submit-form").addEventListener("click", action.bind(this));

        this.btnActions();
    }

    //Obtenemos los datos del usuario
    async getData(id) {
        const url = `${apiURL}/user/get?id_user=${id}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.status == 401) {
            this.innerHTML = Forbidden;
            return;
        }

        const data = await response.json();
        this.updateForm(data.user);
    }

    //Borrar usuario
    async deleteUser() {
        const url = `${apiURL}/user/delete?id_user=${this.userId}`;

        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.status == 401) {
            this.innerHTML = Forbidden;
            return;
        } else if (response.status != 200) {
            this.innerHTML = "<h2>Se ha producido un error al borrar el usuario</h2>";
            return;
        }

        const data = await response.json();

        this.querySelector("#openModal .modalContent").innerHTML = `<h2 style="padding: 4rem">Usuario borrado con éxito</h2>`;
        document.getElementById("close-btn").addEventListener("click", function () {
            this.querySelector("#openModal").style.display = "none";
            location.href = "#users";
        }.bind(this));
    }

    //Crear nuevo usuario
    async newUser(event) {
        event.preventDefault();
        const url = `${apiURL}/user/insert`;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const userData = new FormData(this.querySelector("#user-form"));

        const formEntries = Object.fromEntries(userData.entries());

        const validatedEntries = this.validate(formEntries);

        if (!validatedEntries) {
            this.querySelector("#message").innerHTML = `<span style = "color: red"> ${this.error}</span>`
            return;
        } else {
            this.error = "";
        }

        if (formEntries["active_user"]) formEntries["active_user"] = 1;
        else formEntries["active_user"] = 0;

        formEntries["role_user"] = Number(formEntries["role_user"]);

        const body = JSON.stringify(formEntries);

        const options = {
            method: 'POST',
            headers: headers,
            body: body
        };

        const response = await fetch(url, options);

        const data = await response.json();

        if (data.status == 200) {
            this.querySelector("#message").innerHTML = `<span style = "color: green"> Usuario creado con éxito.</span>`
        } else {
            this.querySelector("#message").innerHTML = `<span style = "color: red"> Error al crear el usuario.</span>`
        }
    }

    //Actualizar usuario
    async updateUser(event) {
        event.preventDefault();
        const url = `${apiURL}/user/update?id_user=${this.userId}`;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const userData = new FormData(this.querySelector("#user-form"));

        const formEntries = Object.fromEntries(userData.entries());
        const validatedEntries = this.validate(formEntries);

        if (!validatedEntries) {
            this.querySelector("#message").innerHTML = `<span style = "color: red"> ${this.error}</span>`
            return;
        } else {
            this.error = "";
        }
        if (!this.passChange) delete formEntries["password_user"];

        if (this.querySelector("[name=active_user]")){
            if(formEntries["active_user"]) formEntries["active_user"] = 1;
            else formEntries["active_user"] = 0;
        }else{
            delete formEntries["active_user"];
        }

        if(formEntries["role_user"]!==undefined){
            formEntries["role_user"] = Number(formEntries["role_user"]);
        }else{
            delete formEntries["role_user"];
        }

        const body = JSON.stringify(formEntries);

        const options = {
            method: 'PUT',
            headers: headers,
            body: body
        };

        const response = await fetch(url, options);

        const data = await response.json();

        if (data.status == 200) {
            this.querySelector("#message").innerHTML = `<span style = "color: green"> Usuario modificado con éxito.</span>`
        } else {
            this.querySelector("#message").innerHTML = `<span style = "color: red"> Error al modificar el usuario.</span>`
        }
    }

    //Actulizar el contenido del formulario
    async updateForm(data) {
        for (let key in data) {
            // let formKey = key.split("_")[0];
            let formKey = key;
            let formInput = document.querySelector('[name="' + formKey + '"]');
            if (formInput != null) {
                formInput.value = data[key];

                if (userSession.id == data["id_user"]
                    && userSession.role != "admin"
                    && !["email_user", "password_user"].includes(key)) {
                    formInput.disabled = true;
                    // formInput.style.backgroundColor = "darkgray";
                    // formInput.style.color = "lightgray";
                }
            }
        }

        if (data["active_user"] == 0) this.querySelector("[name=active_user]").checked = false;
        if (userSession.id == data["id_user"]) {
            this.querySelector("input.btn-alert").remove();
            this.querySelector(".check").remove();
            this.querySelector(".box").remove();
        }
    }

    //Validar el formulario
    validate(entries) {

        // NIF (Numero de Identificación Fiscal) - 8 numeros y una letra1
        // NIE (Numero de Identificación de Extranjeros) - 1 letra2, 7 numeros y 1 letra1
        const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        const values = Object.values(entries).every(entry => entry != "");

        if (!values) {
            this.error = "No puede haber campos vacíos.";
            return false;
        }

        if (entries["dni_user"] != undefined
            && !nifRegex.test(entries["dni_user"])
            && !nieRegex.test(entries["dni_user"])) {
            this.error = "El formato del NIF/NIE no es correcto.";
            return false;
        }

        if (!emailRegex.test(entries["email_user"])) {
            this.error = "El email introducido no es correcto.";
            return false;
        }


        return true;
    }

    //Añadir eventos JavaSrcipt a los botones
    btnActions() {
        document.getElementById("delete-btn").addEventListener("click", function () {
            this.querySelector("#openModal").style.display = "block";
        }.bind(this));

        document.getElementById("close-btn").addEventListener("click", function () {
            this.querySelector("#openModal").style.display = "none";
        }.bind(this));

        document.getElementById("cancel-btn").addEventListener("click", function () {
            this.querySelector("#openModal").style.display = "none";
        }.bind(this));

        document.getElementById("confirm-btn").addEventListener("click", this.deleteUser.bind(this));
    }
}

customElements.define("user-form", UserForm);