import { UserList } from "../views/users/userlist.js";
import { User } from "../views/users/user.js";
import { LandAdmin } from "../views/land/landadmin.js";
import { LandUser } from "../views/land/landuser.js";
import { LandSupervisor } from "../views/land/landsupervisor.js";
import { RecordList } from "../views/records/recordlist.js";
import { Record } from "../views/records/record.js";
import { IncidentList } from "../views/incidents/incidentlist.js";
import userSession from "../session.js";

/**
 * Clase Content
 * Contenido principal del panel de control
 * @extends HTMLElement
 */
class Content extends HTMLElement {
    constructor() {
        super();
        window.addEventListener("hashchange", this.render.bind(this));
        this.render();
    }
    
    //Renderiza el HTML del componente
    render() {
        let content = location.hash.slice(1);
        let params=[];

        if(content) params=content.split("/");

        if(params.length>1){
            content=params[0];
        }

        switch (content) {
            case 'users':
                if(userSession.role =='admin' || userSession.role =='supervisor' ) this.innerHTML = UserList();
                else this.innerHTML = Forbidden;
                break;
            case 'userform':
                this.innerHTML = User();
                break;
            case 'records':
                this.innerHTML = RecordList();
                break;
            case 'incidents':
                this.innerHTML = IncidentList();
                break;
            case 'recordform':
                this.innerHTML = Record();
                break;
            default:
                switch(userSession.role){
                    case 'admin':
                        this.innerHTML = LandAdmin();
                        break;
                    case 'supervisor':
                        this.innerHTML = LandSupervisor();
                        break;
                    default:
                        this.innerHTML = LandUser();
                }
        }

    }
}

//Definimos el componente personalizado
customElements.define("main-content", Content);