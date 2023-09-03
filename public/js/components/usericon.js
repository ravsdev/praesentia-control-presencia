import { apiURL, appPATH } from "../config.js";
import userSession from "../session.js";

/**
 * Clase UserIcon
 * Icono de usuario
 * @extends HTMLElement
 */
export class UserIcon extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    //Renderiza el HTML del componente
    render(){
        this.innerHTML = `<div class="dropdown">
    <input type="checkbox" id="checkbox-toggle">
    <label for="checkbox-toggle">
        <div class="account"><span>${userSession.name}</span>
            <div id="user-icon" class="user">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Cuenta</title>
                    <path
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
            </div>
        </div>
    </label>
    <ul>
        <li id="panel"><a href="javascript:void(0)">Panel de control</a></li>
        <li id="account"><a href="javascript:void(0)">Perfil</a></li>
        <li id="logout" style="border-top: 1px solid black"><a href="javascript:void(0)">Salir</a></li>
    </ul>
</div>`;
        this.querySelector("#panel").addEventListener("click",()=>location.href="./dashboard");
        this.querySelector("#account").addEventListener("click",()=>location.href=`./dashboard#userform/${userSession.id}`);
        this.querySelector("#logout").addEventListener("click",this.logout.bind(this));
    }

    async logout() {
        //Remove session data
        sessionStorage.removeItem("user");

        //Remove cookie if exists
        const date = new Date();
        date.setDate(date.getDate() - 1);
        document.cookie = `user=; expires=${date.toGMTString()}, ; path=/;`;
        
        //Send end session to server
        const url = `${apiURL}/login/logout`;

        const response = await fetch(url, {
            method: 'GET'
        });

        const data = await response.json();

        if(data['status']==200){
            window.location = appPATH;
        }

    }

}

//Definimos el componente personalizado
customElements.define("user-icon", UserIcon);