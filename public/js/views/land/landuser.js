import "../../components/records/recordaction.js";
import "../../components/records/recordsum.js";

const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });

export function LandUser() {
    return `<div class="content-container">
    <h1>Inicio</h1>
    <main>
        <div class="cardBox">
            <div>
                <div style="background: var(--blue2); border-radius: 25px; padding: 15px; max-width: 600px;">
                    <h3>Generar nuevo registro</h3>
                    <record-action></record-action>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="numbers"><record-sum hours="month"></record-sum></div>
                    <div class="cardName">Total registrado en ${currentMonth} </div>
                </div>
                <div class="iconBox">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Mes</title>
                        <path
                            d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" />
                    </svg>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="numbers"><record-sum hours="week"></record-sum></div>
                    <div class="cardName">Total registrado esta semana </div>
                </div>
                <div class="iconBox">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Semana</title>
                        <path
                            d="M6 1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1M5 8V19H19V8H5M7 10H17V12H7V10Z" />
                    </svg>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="numbers"><record-sum hours="today"></record-sum></div>
                    <div class="cardName">Total registrado hoy </div>
                </div>
                <div class="iconBox">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>Hoy</title>
                        <path
                            d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
                    </svg>
                </div>
            </div>
        </div>
    </main>
</div>`;
}