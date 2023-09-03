<?php

/**
 * Clase IncidentController
 * Se encarga de gestionar las incidencias
 */
class IncidentController extends Controller
{    
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->setModel(new Incident());
    }
    
    /**
     * Method main
     *
     * @return void
     */
    public function main()
    {
        $this->getAll();
    }
        
    /**
     * Method get
     * 
     * Devuelve los datos de una incidencia
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function get($params){
        $result=$this->model->getIncident($params['id_user'],"*");
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
     * Method getUser
     * 
     * Devuelve las incidencias de un usuario
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function getUser($params)
    {
        $this->checkMethod('GET');
        // $this->isAuth(['admin', 'supervisor', 'empleado']);

        if (isset($params['id_user']) && isset($params['date_from']) && isset($params['date_to'])) {
            $result = $this->model->getUserIncidents($params['id_user'], $params['date_from'], $params['date_to']);
        } else {
            $result = $this->model->getUserIncidents($params['id_user']);
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
     * Method getAll
     * 
     * Devuelve todas las incidencias
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function getAll($params=null)
    {
        $this->checkMethod('GET');
        $this->isAuth(["admin", "supervisor"]);

        if (isset($params['date_from']) && isset($params['date_to'])) {
            $result = $this->model->getAllIncidents($params['date_from'], $params['date_to']);
        } else {
            $result = $this->model->getAllIncidents();
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
     * Method getLatest
     * 
     * Devuelve las últimas incidencias, si no se especifica el número, devuelve las 5 últimas
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function getLatest($params = null)
    {

        $this->checkMethod('GET');

        $this->isAuth(['admin','supervisor']);

        $num = $params['latest'] ?? 5;

        $result = $this->model->getLatest($num);

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
     * Method exists
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function exists($params = null){
        $this->checkMethod('GET');

        $result = $this->model->exists($params['id_record']);

        if ($result) {
            echo json_encode($result);
        } else {
            $json = array(
                'status' => 204
            );

            $this->response($json);
        }
    }
}