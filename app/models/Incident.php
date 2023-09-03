<?php

/**
 * Clase Incident
 * Accede a la base datos para gestionar las incidencias.
 */
class Incident extends Model
{    
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->setTable("incidents");
    }    
    
    /**
     * Method getUserIncidents
     *
     * Obtiene las incidencias de un usuario.
     * 
     * @param integer $id id de usuario
     * @param date $dateFrom fecha inicio
     * @param date $dateTo fecha fin
     *
     * @return array|boolean
     */
    public function getUserIncidents($id, $dateFrom = null, $dateTo = null)
    {
        if ($dateFrom == null) $dateFrom = date("1970-01-01");
        if ($dateTo == null) $dateTo = date("Y-m-d");

        try {
            $sql = "SELECT u.id_user,
                    DATE_FORMAT(DATE(i.record_begin_incident),'%d/%m/%Y') as date_record,                    
                    TIME(r.begin_record) as begin_time,
                    TIME(r.end_record) as end_time,
                    TIME(i.record_begin_incident) as original_begin,
                    TIME(i.record_end_incident) as original_end,
                    i.description_incident,
                    u.name_user,u.last_name_user, u.dni_user
                    FROM $this->table i
                    JOIN users u ON u.id_user = i.id_user
                    JOIN records r ON r.id_record = i.id_record
                    WHERE u.id_user=? AND DATE(i.record_begin_incident) BETWEEN '$dateFrom' AND '$dateTo' 
                    ORDER BY i.record_begin_incident DESC;";

            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);

            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Record::getUserRecords():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method getAllIncidents
     * 
     * Obtiene todas las incidencias de la base de datos.
     * 
     * @param date $dateFrom fecha inicio
     * @param date $dateTo fecha fin
     *
     * @return array|boolean
     */
    public function getAllIncidents($dateFrom = null, $dateTo = null)
    {
        if ($dateFrom == null) $dateFrom = date("1970-01-01");
        if ($dateTo == null) $dateTo = date("Y-m-d");

        try {
            $sql = "SELECT u.id_user,
                    DATE_FORMAT(DATE(i.record_begin_incident),'%d/%m/%Y') as date_record,                    
                    TIME(r.begin_record) as begin_time,
                    TIME(r.end_record) as end_time,
                    TIME(i.record_begin_incident) as original_begin,
                    TIME(i.record_end_incident) as original_end,
                    i.description_incident,
                    u.name_user,u.last_name_user, u.dni_user
                    FROM $this->table i
                    JOIN users u ON u.id_user = i.id_user
                    JOIN records r ON r.id_record = i.id_record
                    WHERE DATE(i.record_begin_incident) BETWEEN '$dateFrom' AND '$dateTo' 
                    ORDER BY i.record_begin_incident DESC;";

            $stmt = $this->database->prepare($sql);

            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Record::getUserRecords():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method getLatest
     * Obtiene las últimas incidencias.
     * @param integer $num número de registros a mostrar
     *
     * @return void
     */
    public function getLatest($num)
    {
        try {
            $sql = "SELECT u.id_user,
                DATE_FORMAT(DATE(i.record_begin_incident),'%d/%m/%Y') as date_record,                    
                TIME(r.begin_record) as begin_time,
                TIME(r.end_record) as end_time,
                TIME(i.record_begin_incident) as original_begin,
                TIME(i.record_end_incident) as original_end,
                i.description_incident,
                u.name_user,u.last_name_user, u.dni_user
                FROM $this->table i
                JOIN users u ON u.id_user = i.id_user
                JOIN records r ON r.id_record = i.id_record
                ORDER BY record_begin_incident DESC LIMIT ?";
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $num, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Model::getAll():' . $e->getMessage());
            return false;
        }
    }    

    /**
     * Method exists
     *
     * @param integer $idRecord id del registro
     *
     * @return void
     */
    public function exists($idRecord){
        try {
            $sql = "SELECT id_incident, description_incident FROM $this->table WHERE id_record = ?";
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $idRecord, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Model::exists():' . $e->getMessage());
            return false;
        }       

        
    }
}
