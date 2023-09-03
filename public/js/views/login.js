import "../components/loginform.js";
import "../components/footer.js";
export function Login() {
    return `<div class="home-container">
    <header class="topbar account">

    </header>
    <div class="wrapper">
        <header>
            <span class="icon">
                <svg width=50px xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="white"
                        d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M15.3 16.2L14 17L11 11.8V7H12.5V11.4L15.3 16.2Z" />
                </svg>
            </span>
            <h1>Praesentia</h1>
        </header>

        <main class="login-container">
            <div class="cover">
                <img src="./src/imgs/bgtime.png" alt="Praesentia">
                <div class="text">
                    <span class="text-1" style="display: flex; align-items: center;"> <svg width=50px
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="white"
                                d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M15.3 16.2L14 17L11 11.8V7H12.5V11.4L15.3 16.2Z" />
                        </svg>Praesentia</span>
                    <span class="text-2">Control de la jornada laboral</span>
                </div>
            </div>
            <login-form></login-form>
        </main>

    </div>
    <prasentia-footer style="width:100%"></prasentia-footer>
</div>`;
}