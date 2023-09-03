<?php

/**
 * Clase controlador
 * De esta clase heredan todos los controladores
 */
class Controller
{
    protected $session;
    protected $model;
    
    /**
     * Method __construct
     * 
     * Inicia sesión
     *
     * @return void
     */
    public function __construct()
    {
        $this->session = new Session();
    }
    
    /**
     * Method checkSession
     * 
     * Comprueba si existe una sesión activa
     *
     * @return void
     */
    protected function checkSession()
    {
        $json = ($this->session->exists()) ?
            array(
                'status' => 200,
                'user' => $this->session->getUser()
            ) :
            array(
                'status' => 401,
                'error' => Errors::$ERROR_NOT_LOGGED
            );

        $this->response($json);
        exit;
    }
    
    /**
     * Method checkMethod
     * 
     * Comprueba si el método de petición coincide con el que corresponde al pasado por parámetro.
     *
     * @param string $method método (POST,GET,etc) a comprobar
     *
     * @return void
     */
    protected function checkMethod($method)
    {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            $json = array(
                'status' => 405,
                'error' => 'Method Not Allowed'
            );

            $this->response($json);

            exit;
        }
    }
        
    /**
     * Method isAuth
     * 
     * Comprueba si el usuario actual está autorizado a usar el método desde el que se llama. 
     *
     * @param array $role=[] lista de roles
     *
     * @return void
     */
    protected function isAuth($role=[])
    {
        // error_log($_COOKIE['user']);
        //$userCookie=json_decode($_COOKIE['user']);
        
        $user = $this->session->getUser();
        
        if (!isset($user) || !in_array($user['role'],$role)) {
            $json = array(
                'status' => 401,
                'error' => 'Unauthorized'
            );

            $this->response($json);

            exit;
        }
    }
    
    /**
     * Method setModel
     * 
     * Establece el modelo con el que trabajará el controlador.
     *
     * @param "Model" $model instancia de Model
     *
     * @return void
     */
    public function setModel($model)
    {
        $this->model = $model;
    }
    
    /**
     * Method response
     * 
     * Envía una respuesta en formato JSON.
     *
     * @param array $json información a enviar
     *
     * @return void
     */
    public function response($json)
    {
        if (!isset($json['status']))
            $json['status'] = 204;
        echo json_encode($json, http_response_code($json['status']));
    }
    
}