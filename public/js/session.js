/**
 * Clase Session
 */
class Session {
    //Constructor
    constructor() {
        this.storage = sessionStorage.getItem("user");
        this.user = { id: '', name: '', email: '', role: '' }
        if (this.storage != undefined) this.user = JSON.parse(this.storage);
    }
    
    //Devuelve la id de usuario
    get id() {
        return this.user['id'];
    }

    //Devuelve el nombre de usuario
    get name() {
        return this.user['name'];
    }

    //Devuelve el email del usuario
    get email() {
        return this.user['email'];
    }

    //Devuelve el rol del usuario
    get role() {
        return this.user['role'];
    }
}

const userSession = new Session();

export default userSession;