import userSession from "./session.js";
import { Login } from "./views/login.js";
import { Dashboard } from "./views/dashboard.js";
import { NotFound } from "./views/notfound.js";
import { appPATH } from "./config.js";
import { Home } from "./views/home.js";

let currentView;

//Rutas
const routes = {
    "/": { title: "Praesentia - Login", render: Login },
    "/login": { title: "Praesentia - Login", render: Login },
    "/dashboard": { title: "Praesentia - Dashboard", render: Dashboard },
    "/home": { title: "Praesentia - Home", render: Home }
};

//Función encargada de renderizar las vistas según la URL.
function router() {
    let newLocation = location.pathname.split(appPATH)[1];
    let view = routes["/" + newLocation];
    const app = document.querySelector("#app");

    if (!view) {
        app.innerHTML = NotFound;
    } else {
        if (currentView != view) {
            if (!userSession.id) {
                view = routes["/login"];
            }
            
            document.title = view.title;
            app.innerHTML = view.render();
            currentView = view;
        }
    }

};

//Controlar la navegación
window.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
        event.preventDefault();
        history.replaceState("", "/", event.target.href);
        router();
    }
});

//Actualizar router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);