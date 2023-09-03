<?php

/**
 * Clase LoginController
 * Controlador encargado de el inicio y cierre de sesión
 */
class LoginController extends Controller
{    
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->setModel(new Login());
    }
    
    /**
     * Method main
     *
     * @return void
     */
    public function main()
    {
        $this->auth();
    }
    
    /**
     * Method auth
     * 
     * Devuelve si el usuario ha iniciado sesión con éxito o no.
     *
     * @return void
     */
    public function auth()
    {
        $this->checkMethod("POST");
        
        if($this->session->exists()){
            $json = array(
                'status' => 200,
                'user' => $this->session->getUser()
            );

            $this->response($json);

            exit;
        }else if(isset($_COOKIE['user'])){
            $cookie=json_decode($_COOKIE['user'],true);
            
            $this->session->setUser($cookie);
                $json = array(
                    'status' => 200,
                    'user' => $cookie
                );
        }

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['email']) && !isset($data['password'])) {
            $json = array(
                'status' => 401,
                'error' => 'no data'
            );

            $this->response($json);
        } else {
            $user = $this->model->login($data['email'], $data['password']);            

            if ($user === null) {
                $json = array(
                    'status' => 401,
                    'error' => Errors::$ERROR_LOGIN_NOTFOUND
                );
            } else if ($user === false) {
                $json = array(
                    'status' => 401,
                    'error' => Errors::$ERROR_LOGIN_PASSWORD
                );
            } else if ($user->getActive() == 0) {
                $json = array(
                    'status' => 401,
                    'error' => Errors::$ERROR_USER_NOTACTIVE
                );
            } else {

                $this->session->setUser(['id'=>$user->getId(),'name' => $user->getName(),'email' => $user->getEmail(), 'role' => $user->getRole()]);
                $json = array(
                    'status' => 200,
                    'user' => $this->session->getUser()
                );
            }
            $this->response($json);
        }
    }
    
    /**
     * Method logout
     * 
     * Cierra la sesión del usuario
     *
     * @return void
     */
    public function logout()
    {
        $this->checkMethod("GET");
        
        $this->session->end();

        $json = array(
            'status' => 200,
        );

        $this->response($json);
    }
}
