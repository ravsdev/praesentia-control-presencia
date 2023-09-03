<?php

/**
 * Clase UserController
 * Se encarga de la gestión de los registros
 */
class UserController extends Controller
{    
    /**
     * Method __construct
     *
     * @return void
     */
    function __construct()
    {
        parent::__construct();
        $this->setModel(new User());
    }
    
    /**
     * Method main
     *
     * @return void
     */
    public function main()
    {
        $this->response(['status' => 204]);
    }

    
    /**
     * Method count
     * 
     * Devuelve el número total de usuarios según el rol dado por parámetro.
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function count($params = null)
    {
        $this->checkMethod('GET');

        $this->isAuth(['admin']);

        if (isset($params)) {
            $result = $this->model->countRoles($params['role']);
        } else {
            $result = $this->model->count();
        }

        if ($result) {
            echo json_encode($result);
        } else {
            $json = array(
                'status' => 204
            );

            $this->response($json);
        }
    }
    
    /**
     * Method get
     * 
     * Devuelve los datos de un usuario dada su id
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function get($params)
    {
        $this->checkMethod('GET');

        if (isset($params['id_user'])) {
            $id = $params['id_user'];
            $idSession = $this->session->getUser()["id"] ?? null;

            if ($id != $idSession) {
                $this->isAuth(['admin']);
            }

            $cols = $params['select'] ?? '*';
            $result = $this->model->get(intval($id), $cols);

            $json = array(
                'status' => 200,
                'user' => $result
            );

            $this->response($json);
        }
    }
    
    /**
     * Method getLatest
     * 
     * Devuelve una lista de los últimos empleados añadidos a la base de datos.
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function getLatest($params = null)
    {

        $this->checkMethod('GET');

        $this->isAuth(['admin']);

        $select = $params['select'] ?? '*';
        $num = $params['latest'] ?? 5;

        $result = $this->model->getLatest($select, $num);

        if ($result) {
            echo json_encode($result);
        } else {
            $json = array(
                'status' => 204
            );

            $this->response($json);
        }
    }
    
    /**
     * Method getAll
     * 
     * Devuelve una lista de todos los empleados.
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function getAll($params = null)
    {

        $this->checkMethod('GET');

        $this->isAuth(['admin', 'supervisor']);

        $select = $params['select'] ?? '*';
        // $cols=$params?implode(",",array_keys($params)):"*";

        //Sólo los administradores pueden ver a otros administradores
        //Los supervisores no pueden ver a los administradores
        $userRole = $this->session->getUser()['role'];
        if ($userRole == 'admin') $result = $this->model->getAll($select);
        else if ($userRole == 'supervisor') $result = $this->model->getUsers($select, 'admin');

        if ($result) {
            echo json_encode($result);
        } else {
            $json = array(
                'status' => 204
            );

            $this->response($json);
        }
    }
    
    /**
     * Method insert
     * 
     * Devuelve si la creación de un usuario ha tenido éxito.
     *
     * @return void
     */
    public function insert()
    {
        $this->checkMethod('POST');
        $this->isAuth(['admin']);

        $data = json_decode(file_get_contents('php://input'), true);

        $result = $this->model->insertUser($data);

        $json = ($result) ?
            array(
                'status' => 200
            ) :
            array(
                'status' => 409,
                'error' => 'Conflict'
            );

        $this->response($json);
    }
    
    /**
     * Method update
     * 
     * Devuelve si la modificación de un usuario ha tenido éxito.
     *
     * @return void
     */
    public function update()
    {
        $this->checkMethod('PUT');
        if (isset($_GET['id_user'])) {
            if($_GET['id_user']!=$this->session->getUser()['id']) {
                $this->isAuth(['admin']);
            }

            $data = json_decode(file_get_contents('php://input'), true);

            $result = $this->model->updateUser($data, intval($_GET['id_user']));
        }

        $json = ($result) ?
            array(
                'status' => 200
            ) :
            array(
                'status' => 409,
                'error' => 'Conflict'
            );

        $this->response($json);
    }
    
    /**
     * Method delete
     * 
     * Devuelve si la eliminación de un usuario ha tenido éxito.
     *
     * @return void
     */
    public function delete()
    {
        $this->checkMethod('DELETE');
        $this->isAuth(['admin']);

        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($_GET['id_user'])) {
            $result = $this->model->delete(intval($_GET['id_user']));
        }

        $json = ($result) ?
            array(
                'status' => 200
            ) :
            array(
                'status' => 404,
                'error' => 'User not found'
            );

        $this->response($json);
    }
}
