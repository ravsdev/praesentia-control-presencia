import { apiURL, roles } from "../../config.js";
import userSession from "../../session.js";
import { Forbidden } from "../../views/forbidden.js";

/**
 * Clase RecordForm
 * Formulario de registro
 * @extends HTMLElement
 */
export class RecordForm extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="loading-container"><img src="./src/imgs/loading.gif"></div>`;
        this.render();
    }

    //Renderiza el HTML del componente
    render() {
        let content = location.hash;
        let params = content.split("/");
        this.recordId = params[1];
        this.error = "La hora de salida no puede ser anterior a la de entrada.";
        this.getData(this.recordId);
    }

    //Obtenemos los datos del registro
    async getData(id=null) {
        const url = `${apiURL}/record/get?id_record=${id}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        if (response.status == 401) {
            this.innerHTML = Forbidden;
            return;
        }if(response.status!= 200){
            this.innerHTML = "<h2>Se ha producido un error</h2>";
            return;
        }

        this.modal=`<div id="openModal" class="modalDialog">
  <div>
    <button id="close-btn" title="Close" class="close">X</button>
    <div class="modalContent">
      <header>
        <h2 style="color:red;">¡Atención!</h2>
        <p>Se va a eliminar un registro, ¿estás seguro?</p>
      </header>
      <div class="modalBtns">
        <button id="confirm-btn" class="btn btn-alert">Sí</button>
        <button id="cancel-btn" class="btn">No</button>
      </div>
    </div>
  </div>
</div>`;

        this.innerHTML = `${this.modal}<form id="record-form" method="POST">
        <div>
            <label for="date_record">Fecha</label>
            <input type="date" name="date_record" disabled>
        </div>
        <div>
            <label for="begin_time">Entrada</label>
            <input type="time" name="begin_time" step="1" required>
        </div>
        <div>
            <label for="end_time">Salida</label>
            <input type="time" name="end_time" step="1" required>
        </div>
        <label for="incidencia">Motivo</label>
        <textarea name="description_incident" form="record-form" placeholder="Introduce la incidencia..."></textarea>
        
        <div class="button input-box">
            <input id="submit-form" type="button" value="Guardar"></input>
            <input id="delete-btn" class="btn-alert" type="button" value="Borrar"></input>
        </div>
        <div id="message"><span style="font-weight: 400; color: red;">Atención: Únicamente se puede modificar el registro una única vez.</span></div>
    </form>
    `;
        const data = await response.json();
        if(data.id_user != userSession.id){
            this.innerHTML=Forbidden;
        }else{
            this.updateForm(data);
        document.getElementById("submit-form").addEventListener("click", this.updateRecord.bind(this));
        
        this.getIncident();
        this.btnActions();
        }
    }

    //Obtenemos las incidencias
    async getIncident(){
        const url = `${apiURL}/incident/exists?id_record=${this.recordId}`;

        const response = await fetch(url, {
            method: 'GET'
        });

        //Si se ha encontrado incidencia, deshabilitamos el formulario.
        if (response.status == 200) {
            const data = await response.json();
            this.querySelector("#submit-form").remove();
            this.querySelector("[name=description_incident]").value=data["description_incident"];
            this.querySelectorAll("#record-form input[type=time], textarea").forEach(el=>el.disabled=true);
            this.querySelector("#message span").innerHTML="El registro ya ha sido modificado.";
        }
    }

    //Modificar registro
    async updateRecord(event) {
        event.preventDefault();

        const url = `${apiURL}/record/update?id_record=${this.recordId}&id_user=${userSession.id}`;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const recordData = new FormData(this.querySelector("#record-form"));
        
        //Validamos los campos
        const validatedData = this.validate(recordData.get('begin_time'),recordData.get('end_time'),recordData.get('description_incident').length);

        if (!validatedData) {            
            if(!recordData.get('description_incident').length>0) this.error="Debes escribir una descripción de la incidencia.";
            this.querySelector("#message").innerHTML = `<span style = "color: red"> ${this.error}</span>`
            return;
        } else {
            this.error = "";
        }

        const date = this.querySelector("[name=date_record]").value;

        const body = JSON.stringify({
            "begin_record": date+" "+recordData.get('begin_time'),
            "end_record": date+" "+recordData.get('end_time'),
            "description_incident": recordData.get('description_incident')
        });

        const options = {
            method: 'PUT',
            headers: headers,
            body: body
        };
        
        const response = await fetch(url, options);

        const data = await response.json();

        if (data.status == 200) {
            this.querySelector("#message").innerHTML = `<span style = "color: green"> Registro modificado con éxito.</span>`
        } else {
            this.querySelector("#message").innerHTML = `<span style = "color: red"> Este registro ya ha sido modificado.</span>`
        }
    }

    //Borrar registro
    async deleteRecord(){
        const url = `${apiURL}/record/delete?id_record=${this.recordId}&id_user=${userSession.id}`;

        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.status == 401) {
            this.innerHTML = Forbidden;
            return;
        }

        const data = await response.json();
        
        this.querySelector("#openModal .modalContent").innerHTML=`<h2 style="padding: 4rem">Registro borrado con éxito</h2>`;
        document.getElementById("close-btn").addEventListener("click", function(){
            this.querySelector("#openModal").style.display="none";
            location.href=`#records/${userSession.id}`;
        }.bind(this));
    }

    //Actualizar formulario
    async updateForm(data) {
        for (let key in data) {
            let formKey = key;
            let formInput = document.querySelector('[name="' + formKey + '"]');
            if (formInput != null) formInput.value = data[key];
        }
    }
    
    //Validación
    validate(hourIn,hourOut,desc){     
        const now = new Date();
        const currentHour = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const hour1 = parseInt(hourIn.slice(0, 2)) * 3600 + parseInt(hourIn.slice(3, 5)) * 60;
        const hour2 = parseInt(hourOut.slice(0, 2)) * 3600 + parseInt(hourOut.slice(3, 5)) * 60;
        
        if (hour2 > currentHour) {
          this.error = "La hora de salida no puede ser posterior a la hora actual.";
          return false;
        }
        
        this.error = "La hora de salida no puede ser anterior a la de entrada.";
        return hour1 < hour2 && desc > 0;
    }

    //Acciones de los botones
    btnActions(){
        document.getElementById("delete-btn").addEventListener("click", function(){
            this.querySelector("#openModal").style.display="block";
        }.bind(this));

        document.getElementById("close-btn").addEventListener("click", function(){
            this.querySelector("#openModal").style.display="none";
        }.bind(this));

        document.getElementById("cancel-btn").addEventListener("click", function(){
            this.querySelector("#openModal").style.display="none";
        }.bind(this));

        document.getElementById("confirm-btn").addEventListener("click", this.deleteRecord.bind(this));
    }

}

customElements.define("record-form", RecordForm);