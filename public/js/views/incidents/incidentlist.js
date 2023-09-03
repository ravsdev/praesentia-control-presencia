import '../../components/incidents/incidenttable.js';
import '../../components/pickdate.js';

export function IncidentList() {
    return `<div class="content-container">
    <div class="main-title">
        <h2>INCIDENCIAS</h2>
    </div>
    <incident-table></incident-table>
</div>`;
}