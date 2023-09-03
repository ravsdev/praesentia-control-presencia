import "../components/maincontent.js";
import "../components/usericon.js";
import "../components/footer.js";
import "../components/nav.js";
import userSession from "../session.js";

export function Home() {
    return `<div class="home-container">
    <header class="topbar account">
        <user-icon></user-icon>
    </header>
    <!-- Main -->
    <main class="login-container">
        <div class="cover">
            <img src="./src/imgs/bgtime.png" alt="Praesentia">
            <div class="text">
                <span class="text-1">Praesentia</span>
                <span class="text-2">Control de la jornada laboral</span>
            </div>
        </div>
        <record-action></record-action>
    </main>
    <prasentia-footer style="width:100%"></prasentia-footer>
</div>`;
}