import "../components/footer.js";

export const NotFound=`<div class="wrapper" style="flex-direction: column;">
    <svg width="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>file-document-alert-outline</title>
        <path fill="white"
            d="M20 17H22V15H20V17M20 7V13H22V7M6 16H11V18H6M6 12H14V14H6M4 2C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H16C17.11 22 18 21.11 18 20V8L12 2M4 4H11V9H16V20H4Z" />
    </svg>
    <h1 style="color:white;margin-top: 1rem;">404</h1>
    <h2 style="color:white">Página no encontrada</h2>
    <div style="margin-top: 2rem">
        <button class="btn btn-info" onclick="history.back()">Volver</button>
        <a href="/praesentia" class="btn btn-info">Inicio</a>
    </div>
</div>
<prasentia-footer style="width:100%"></prasentia-footer>`;