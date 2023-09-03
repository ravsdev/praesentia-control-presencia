import userSession from "../../session.js";

export const navUser=`<nav id="sidebar" class="navigation">
    <ul>
        <li>
            <a href="#">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M15.3 16.2L14 17L11 11.8V7H12.5V11.4L15.3 16.2Z" />
                    </svg>
                </span>
                <h1 class="title">Praesentia</h1>
            </a>
        </li>
        <li class="active">
            <a href="#">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>home-outline</title>
                        <path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22" />
                    </svg>
                </span>
                <span class="title">Inicio</span>
            </a>
        </li>

        <li>
            <a href="#records/${userSession.id}">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>database-clock-outline</title>
                        <path
                            d="M16.5 16.25L19.36 17.94L18.61 19.16L15 17V12H16.5V16.25M23 16C23 19.87 19.87 23 16 23C13.61 23 11.5 21.8 10.25 20C6.19 19.79 3 18.08 3 16V6C3 3.79 6.58 2 11 2S19 3.79 19 6V9.68C21.36 10.81 23 13.21 23 16M17 9.08V8.64C16.77 8.77 16.5 8.9 16.24 9C16.5 9 16.75 9.04 17 9.08M5 6C5 6.5 7.13 8 11 8S17 6.5 17 6 14.87 4 11 4 5 5.5 5 6M5 11.45C6.07 12.23 7.8 12.76 9.72 12.93C10.33 11.67 11.32 10.62 12.54 9.92C12.04 9.97 11.53 10 11 10C8.61 10 6.47 9.47 5 8.64V11.45M9.26 17.87C9.1 17.27 9 16.65 9 16C9 15.61 9.04 15.23 9.1 14.86C7.56 14.69 6.15 14.33 5 13.77V16C5 16.42 6.5 17.5 9.26 17.87M21 16C21 13.24 18.76 11 16 11S11 13.24 11 16 13.24 21 16 21 21 18.76 21 16Z" />
                    </svg>
                </span>
                <span class="title">Registros</span>
            </a>
        </li>
        <li>
            <a href="#incidents/${userSession.id}">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>database-alert-outline</title>
                        <path
                            d="M10 3C5.58 3 2 4.79 2 7V17C2 19.21 5.59 21 10 21S18 19.21 18 17V7C18 4.79 14.42 3 10 3M16 17C16 17.5 13.87 19 10 19S4 17.5 4 17V14.77C5.61 15.55 7.72 16 10 16S14.39 15.55 16 14.77V17M16 12.45C14.7 13.4 12.42 14 10 14S5.3 13.4 4 12.45V9.64C5.47 10.47 7.61 11 10 11S14.53 10.47 16 9.64V12.45M10 9C6.13 9 4 7.5 4 7S6.13 5 10 5 16 6.5 16 7 13.87 9 10 9M22 7V13H20V7H22M20 15H22V17H20V15Z" />
                    </svg>
                </span>
                <span class="title">Incidencias</span>
            </a>
        </li>
    </ul>
</nav>`;