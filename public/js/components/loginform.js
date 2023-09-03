import { apiURL } from "../config.js";

/**
 * Clase LoginForm
 * Formulario de inicio de sesión
 * @extends HTMLElement
 */
class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    //Renderiza el HTML del componente
    render() {
        this.innerHTML = `<div class="form-container">
    <div class="login-form">
        <div class="title">Inicio de sesión</div>
        <form id="login" method="POST" action="#">
            <div class="input-boxes">
                <div class="input-box">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>email-outline</title>
                        <path
                            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                    </svg>
                    <input class="control" type="email" name="email" placeholder="E-Mail" required>
                </div>
                <div class="input-box">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>lock-outline</title>
                        <path
                            d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                    </svg>
                    <input class="control" type="password" name="password" placeholder="Contraseña" required>
                </div>                
            </div>
            <!-- <div class="text"><input type="checkbox" name="remember">
                <label for="remember">Recordarme</label>
            </div> -->
            <div class="button input-box">
                <input id="submit-form" type="submit" value="Entrar"></input>
            </div>
        </form>
        <span id="message" class="hide error"></span>
    </div>
</div>`;

        const btn = this.querySelector("#submit-form");
        const message = this.querySelector("#message");

        btn.addEventListener("click", async (event) => {
            event.preventDefault();
            const url = `${apiURL}/login/auth`;

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const loginForm = new FormData(this.querySelector("#login"));

            //Validación de formulario
            const emailValue = loginForm.get("email");
            const passValue = loginForm.get("password");

            const emailRegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (emailValue === null || emailValue.trim() === "" || !emailRegExp.test(emailValue)) {
                message.innerHTML = "Introduce un e-mail válido";
                message.classList.remove("hide");
                return;
            }

            if (passValue === null || passValue.trim() === "") {
                message.innerHTML = "Introduce una contraseña";
                message.classList.remove("hide");
                return;
            }

            if (message.classList.contains("hide")) message.classList.remove("hide");

            const body = JSON.stringify({
                "email": loginForm.get("email"),
                "password": loginForm.get("password")
            });

            const options = {
                method: 'POST',
                headers: headers,
                body: body
            };

            const response = await fetch(url, options);

            const data = await response.json();

            if (data.status != 401) {
                message.classList.add("hide");
                message.innerHTML = "";
                sessionStorage.setItem("user", JSON.stringify(data.user));
                window.location = data.user['role']=="empleado"? "./home":"./dashboard";
            } else {
                message.innerHTML = data.error;
                message.classList.remove("hide");
            }
        })
    }
}

//Definimos el componente personalizado
customElements.define("login-form", LoginForm);