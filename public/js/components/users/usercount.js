import { apiURL, roles } from "../../config.js";
import userSession from "../../session.js";

/**
 * Clase UserCount
 * Muestra el número de usuarios de la base de datos
 * @extends HTMLElement
 */
class UserCount extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="loading-container"><img src="./src/imgs/loading.gif"></div>`;
        this.render();
    }

    //Renderiza el HTML del componente
    async render() {
        let url = `${apiURL}/user/count`;
        if(this.getAttribute("role")!=null){
            url+=`?role=${this.getAttribute("role")}`;
        }
    
        const response = await fetch(url + "", {
            method: 'GET'
        });
    
        if (response.status == 204) {
            this.innerHTML = `0`;
            return;
        }
        const data = await response.json();
    
        this.innerHTML = data["Total"];
    }
}

customElements.define("user-count", UserCount);