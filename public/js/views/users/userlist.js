import '../../components/users/usertable.js';
// import { UserForm } from '../components/dashboard/userform.js';

export function UserList() {
    return `
<div class="content-container">
    <div class="main-title">
        <h2>EMPLEADOS</h2>
    </div>
    <a class="btn" id="new-user" href="#userform">Nuevo</a>
    <user-table></user-table>
</div>
`;
}