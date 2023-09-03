import { navAdmin } from "../views/nav/navadmin.js";
import { navUser } from "../views/nav/navuser.js";
import userSession from "../session.js";

/**
 * Clase Nav
 * Menú de navegación
 * @extends HTMLElement
 */
class Nav extends HTMLElement {
    //Constructor
    constructor() {
        super();
        this.render();
    }
    
    //Renderiza el HTML del componente
    render() {
        if (userSession.role == "empleado") this.innerHTML = navUser;
        else {
            this.innerHTML = navAdmin;            
        }
        this.responsive();
    }

    getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [key, value] = el.split('=');
            cookie[key.trim()] = value;
        })
        return cookie[cookieName];
    }

    //Añade los eventos JavaScript al menú
    responsive() {
        const list = document.querySelectorAll(".navigation li");
        const toggle = document.querySelector(".toggle");
        const navigation = document.querySelector(".navigation");
        const main = document.querySelector(".main");

        function activeLink() {
            list.forEach((item) => {
                item.classList.remove("active");
            });
            this.classList.add("active");

        }

        list.forEach((item) => item.addEventListener("click", activeLink));

        // Menu Toggle
        toggle.addEventListener('click', () => {
            navigation.classList.toggle("active");
            main.classList.toggle("active");
        });
    }
}

//Definimos el componente personalizado
customElements.define("nav-bar", Nav);