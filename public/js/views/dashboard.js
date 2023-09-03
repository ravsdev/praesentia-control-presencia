import "../components/nav.js";
import "../components/maincontent.js";
import "../components/usericon.js";

export function Dashboard() {
    return `<div class="container">
    <!-- Nav -->
    <nav-bar></nav-bar>
    <!-- Main -->
    <main class="main">
        <div class="topbar">
            <div class="toggle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>menu-open</title>
                    <path
                        d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z" />
                </svg>
            </div>
            <user-icon></user-icon>
        </div>
        <main-content></main-content>
    </main>
</div>`;
}