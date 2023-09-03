import '../../components/users/userlatest.js';
import '../../components/users/usercount.js';

export function LandAdmin() {
    return `<div class="content-container">
    <div class="cardBox">
        <div class="card">
            <div>
                <div class="numbers"><user-count></user-count></div>
                <div class="cardName">Total</div>
            </div>
            <div class="iconBox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Total</title>
                    <path
                        d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                </svg>
            </div>
        </div>
        <div class="card">
            <div>
                <div class="numbers"><user-count role="empleado"></user-count></div>
                <div class="cardName">Empleados</div>
            </div>
            <div class="iconBox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>account-group-outline</title>
                    <path
                        d="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z" />
                </svg>
            </div>
        </div>
        <div class="card">
            <div>
                <div class="numbers"><user-count role="admin"></div>
                <div class="cardName">Administradores</div>
            </div>
            <div class="iconBox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Administradores</title>
                    <path
                        d="M5.8 10C5.4 8.8 4.3 8 3 8C1.3 8 0 9.3 0 11S1.3 14 3 14C4.3 14 5.4 13.2 5.8 12H7V14H9V12H11V10H5.8M3 12C2.4 12 2 11.6 2 11S2.4 10 3 10 4 10.4 4 11 3.6 12 3 12M16 4C13.8 4 12 5.8 12 8S13.8 12 16 12 20 10.2 20 8 18.2 4 16 4M16 10.1C14.8 10.1 13.9 9.2 13.9 8C13.9 6.8 14.8 5.9 16 5.9C17.2 5.9 18.1 6.8 18.1 8S17.2 10.1 16 10.1M16 13C13.3 13 8 14.3 8 17V20H24V17C24 14.3 18.7 13 16 13M22.1 18.1H9.9V17C9.9 16.4 13 14.9 16 14.9C19 14.9 22.1 16.4 22.1 17V18.1Z" />
                </svg>
            </div>
        </div>
        <div class="card">
            <div>
                <div class="numbers"><user-count role="supervisor"></div>
                <div class="cardName">Supervisores</div>
            </div>
            <div class="iconBox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>Supervisores</title>
                    <path
                        d="M10 12C12.21 12 14 10.21 14 8S12.21 4 10 4 6 5.79 6 8 7.79 12 10 12M10 6C11.11 6 12 6.9 12 8S11.11 10 10 10 8 9.11 8 8 8.9 6 10 6M9.27 20H2V17C2 14.33 7.33 13 10 13C11.04 13 12.5 13.21 13.86 13.61C13 13.95 12.2 14.42 11.5 15C11 14.94 10.5 14.9 10 14.9C7.03 14.9 3.9 16.36 3.9 17V18.1H9.22C9.2 18.15 9.17 18.2 9.14 18.25L8.85 19L9.14 19.75C9.18 19.83 9.23 19.91 9.27 20M17 18C17.56 18 18 18.44 18 19S17.56 20 17 20 16 19.56 16 19 16.44 18 17 18M17 15C14.27 15 11.94 16.66 11 19C11.94 21.34 14.27 23 17 23S22.06 21.34 23 19C22.06 16.66 19.73 15 17 15M17 21.5C15.62 21.5 14.5 20.38 14.5 19S15.62 16.5 17 16.5 19.5 17.62 19.5 19 18.38 21.5 17 21.5Z" />
                </svg>
            </div>
        </div>
    </div>
    <div class="main-title">
        <h2>Últimos empleados</h2>
    </div>
    <user-latest num=5></user-latest>
</div>`;
}