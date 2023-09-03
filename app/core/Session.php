<?php

/**
 * Clase Session
 * Controla las sesiones de usuario
 */
class Session
{    
    /**
     * name
     *
     * @var string
     */
    private $name='user';
    
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            //Cross-site
            //session_set_cookie_params(['samesite' => 'None', 'Secure' => true]);
            
            //Inicio de sesión
            session_start();
        }
    }
    
    /**
     * Method setUser
     *
     * Establece la sesión para un usuario
     * 
     * @param $user
     *
     * @return void
     */
    public function setUser($user)
    {
        $_SESSION[$this->name] = $user;
        // $value = json_encode($user);
        // setcookie('user',$value,time()+60*60*24*30,"/");
        
    }
    
    /**
     * Method getUser
     * 
     * Obtiene los datos del usuario de la sesión activa
     *
     * @return array|null
     */
    public function getUser()
    {
        return $_SESSION[$this->name] ?? NULL;
    }
    
    /**
     * Method end
     * Finaliza la sesión
     * @return void
     */
    public function end()
    {
        session_unset();
        session_destroy();
    }
    
    /**
     * Method exists
     * Comprueba si existe una sesión activa.
     * @return boolean
     */
    public function exists()
    {
        return isset($_SESSION[$this->name]);
    }
}
