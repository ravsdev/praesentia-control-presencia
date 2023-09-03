<?php

/**
 * Clase RecordController
 * Se encarga de la gestión de los registros
 */
class RecordController extends Controller
{    
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->setModel(new Record());
    }
    
    /**
     * Method main
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function main($params)
    {
        $this->response(['status' => 204]);
    }
    
    /**
     * Method get
     * 
     * Devuelve los datos de un registro dado su id
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function get($params)
    {
        $this->checkMethod('GET');
        $result = $this->model->getRecord($params['id_record'], "*");
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
     * Devuelve una lista de todos los registros.
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
            $result = $this->model->getAllRecords($params['date_from'], $params['date_to']);
        } else {
            $result = $this->model->getAllRecords();
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
     * Method getUser
     * 
     * Devuelve los registros de un usuario
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function getUser($params)
    {
        $this->checkMethod('GET');
        $this->isAuth(['admin', 'supervisor', 'empleado']);

        if (isset($params['id_user']) && isset($params['date_from']) && isset($params['date_to'])) {
            $result = $this->model->getUserRecords($params['id_user'], $params['date_from'], $params['date_to']);
        } else {
            $result = $this->model->getUserRecords($params['id_user']);
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
     * Method sumHours
     * 
     * Devuelve el número de horas entre dos fechas
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function sumHours($params)
    {
        $this->checkMethod('GET');
        $user = $this->session->getUser();

        switch ($params['hours']) {
            case 'month':
                $dateFrom = date("Y-m-01");
                $dateTo = date("Y-m-t");
                break;
            case 'week':
                $currentWeek = date("W");
                $monday = new DateTime();
                $monday->setISODate(date("Y"), $currentWeek);
                $dateFrom = $monday->format('Y-m-d');

                $sunday = new DateTime();
                $sunday->setISODate(date("Y"), $currentWeek, 7);
                $dateTo = $sunday->format('Y-m-d');
                break;
            case 'today':
                $dateFrom = date("Y-m-d");
                $dateTo = date("Y-m-d");
                break;
            default:
                $dateFrom = '1970-01-01';
                $dateTo = date("Y-m-t");
        }


        if (isset($user)) {
            $result = $this->model->sumHours(intval($user['id']), $dateFrom, $dateTo);
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
     * Method in
     * 
     * Devuelve si el registro de entrada se ha realizado con éxito.
     *
     * @return void
     */
    public function in()
    {
        $this->checkMethod('POST');

        $user = $this->session->getUser();

        if (isset($user)) {

            $lastRecord = $this->model->getLastRow(intval($user['id']));
            $endRecord = $lastRecord['end_record'] ?? NULL;

            if (!$lastRecord || ($lastRecord && $endRecord != NULL)) {
                $result = $this->model->beginRecord($user['id']);
                $json = ($result) ?
                    array(
                        'status' => 200
                    ) :
                    array(
                        'status' => 409,
                        'error' => 'Conflict'
                    );

                $this->response($json);
            } else {
                $this->response(array(
                    'status' => 409,
                    'error' => 'Ya existe una entrada'
                ));
            }
        } else {

            $this->response(array(
                'status' => 401,
                'error' => 'User not found'
            ));
        }
    }
    
    /**
     * Method out
     * 
     * Devuelve si el registro de salida se ha realizado con éxito.
     *
     * @return void
     */
    public function out()
    {
        $this->checkMethod('PUT');

        $user = $this->session->getUser();

        if (isset($user)) {

            $lastRecord = $this->model->getLastRow(intval($user['id']));
            $beginRecord = $lastRecord['begin_record'] ?? NULL;
            $endRecord = $lastRecord['end_record'] ?? NULL;

            if ($lastRecord && $beginRecord != NULL && $endRecord == NULL) {
                $result = $this->model->endRecord($user['id'], $lastRecord['id_record']);
                $json = ($result) ?
                    array(
                        'status' => 200
                    ) :
                    array(
                        'status' => 409,
                        'error' => 'Conflict'
                    );

                $this->response($json);
            } else {
                $this->response(array(
                    'status' => 409,
                    'error' => 'No existe una entrada'
                ));
            }
        } else {

            $this->response(array(
                'status' => 401,
                'error' => 'User not found'
            ));
        }
    }
    
    /**
     * Method last
     * 
     * Devuelve el último registro
     *
     * @return void
     */
    public function last()
    {
        $this->checkMethod('GET');

        $lastRecord = $this->model->getLastRow($this->session->getUser()['id']);
        $json = ($lastRecord) ?
            array(
                'status' => 200,
                'data' => $lastRecord
            ) :
            array(
                'status' => 204
            );

        $this->response($json);
    }
    
    /**
     * Method update
     * 
     * Devuelve si la modificación de un registro ha tenido éxito.
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function update($params)
    {
        $this->checkMethod('PUT');
        
        $result = null;
        $userId = $this->session->getUser();
        
        if (isset($userId['id']) && $userId['id']==$params['id_user']) {

            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($params['id_record'])) {
                $result = $this->model->update(intval($params['id_record']),$data);
            }
        }

        $json = ($result) ?
            array(
                'status' => 200
            ) :
            array(
                'status' => 403,
                'error' => 'Forbidden'
            );

        $this->response($json);
    }
    
    /**
     * Method delete
     * 
     * Devuelve si la eliminación de un registro ha tenido éxito.
     *
     * @param array $params parámetros recibidos en la petición
     *
     * @return void
     */
    public function delete($params)
    {
        $this->checkMethod('DELETE');

        $result = null;
        $userId = $this->session->getUser();

        if (isset($userId['id']) && $userId['id']==$params['id_user']) {

            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($params['id_record'])) {
                $result = $this->model->delete(intval($params['id_record']));
            }
        }

        $json = ($result) ?
            array(
                'status' => 200
            ) :
            array(
                'status' => 403,
                'error' => 'Forbidden'
            );

        $this->response($json);
    }
}
