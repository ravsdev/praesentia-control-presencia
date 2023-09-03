<?php

/**
 * Clase Record
 * 
 * Gestiona los registros en la base de datos.
 */
class Record extends Model
{
    
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->setTable("records");
    }
    
    /**
     * Method getRecord
     *
     * @param integer $id
     *
     * @return void
     */
    public function getRecord($id)
    {
        try {
            $sql = "SELECT u.id_user,r.id_record,u.name_user,u.last_name_user, u.dni_user,
            DATE(r.begin_record) as date_record, TIME(r.begin_record) as begin_time,
            TIME(r.end_record) as end_time,
            TIME_FORMAT(TIMEDIFF(r.end_record,r.begin_record),'%H h %i m') as total
            FROM users u
            JOIN $this->table r ON u.id_user = r.id_user
            WHERE r.id_record=?";

            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Record::getUserRecords():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method getUserRecords
     *
     * @param integer $id
     * @param date $dateFrom fecha inicio
     * @param date $dateFrom fecha fin
     *
     * @return void
     */
    public function getUserRecords($id, $dateFrom = null, $dateTo = null)
    {
        if ($dateFrom == null) $dateFrom = date("1970-01-01");
        if ($dateTo == null) $dateTo = date("Y-m-d");

        try {
            $sql = "SELECT u.id_user,r.id_record,u.name_user,u.last_name_user, u.dni_user,
            DATE_FORMAT(DATE(r.begin_record),'%d/%m/%Y') as date_record, TIME(r.begin_record) as begin_time,
            TIME(r.end_record) as end_time,
            TIME_FORMAT(TIMEDIFF(r.end_record,r.begin_record), '%Hh %im %Ss') as row_total,
            TIME_FORMAT(diff.suma_diff, '%Hh %im %Ss') as total
            FROM users u
            JOIN $this->table r ON u.id_user = r.id_user
            JOIN (SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(end_record, begin_record)))) AS suma_diff FROM $this->table WHERE id_user=? AND DATE(begin_record) BETWEEN '$dateFrom' AND '$dateTo') diff
            WHERE u.id_user=? AND DATE(r.begin_record) BETWEEN '$dateFrom' AND '$dateTo' 
            ORDER BY r.begin_record DESC;";

            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);
            $stmt->bindValue(2, $id, PDO::PARAM_INT);


            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Record::getUserRecords():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method getAllRecords
     *
     * @param date $dateFrom fecha inicio
     * @param date $dateFrom fecha fin
     *
     * @return void
     */
    public function getAllRecords($dateFrom = null, $dateTo = null)
    {
        if ($dateFrom == null) $dateFrom = date("1970-01-01");
        if ($dateTo == null) $dateTo = date("Y-m-d");

        try {
            $sql = "SELECT u.id_user,r.id_record,u.name_user,u.last_name_user, u.dni_user,
            DATE_FORMAT(DATE(r.begin_record),'%d/%m/%Y') as date_record, TIME(r.begin_record) as begin_time,
            TIME(r.end_record) as end_time,
            TIME_FORMAT(TIMEDIFF(r.end_record,r.begin_record), '%Hh %im %Ss') as row_total
            FROM users u
            JOIN $this->table r ON u.id_user = r.id_user
            WHERE DATE(r.begin_record) BETWEEN ? AND ? 
            ORDER BY r.begin_record DESC;";

            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $dateFrom);
            $stmt->bindValue(2, $dateTo);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Record::getAllRecords():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method getLastRow
     *
     * @param integer $id
     *
     * @return void
     */
    public function getLastRow($id)
    {
        try {
            $sql = "SELECT * FROM $this->table WHERE id_user = ? ORDER BY id_record DESC LIMIT 1";
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Record::getLastRow():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method beginRecord
     *
     * @param string $data
     *
     * @return void
     */
    public function beginRecord($data)
    {
        try {
            $sql = "INSERT INTO $this->table (begin_record,id_user) VALUES(NOW(),?)";

            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $data, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            error_log('Record::beginRecord():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method endRecord
     *
     * @param integer $id
     * @param integer $rowId
     *
     * @return void
     */
    public function endRecord($id, $rowId)
    {
        try {
            $sql = "UPDATE $this->table SET end_record = NOW() WHERE id_user = ? AND id_record = ?";
            // echo $sql;
            // die;
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);
            $stmt->bindValue(2, $rowId);

            return $stmt->execute();
        } catch (PDOException $e) {
            error_log('User::endRecord():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method update
     *
     * @param integer $id
     * @param array $data
     *
     * @return void
     */
    public function update($id,$data)
    {
        try {
            $values = '';

            foreach ($data as $key => $value) {
                if($key!='description_incident') $values .= "$key = '$value',";
            }

            $values = rtrim($values, ',');

            $sql = "
                INSERT INTO incidents (id_record,id_user,record_begin_incident, record_end_incident,description_incident)
                SELECT id_record, id_user,begin_record, end_record, ? as description_incident
                FROM records
                WHERE id_record = ?;

                UPDATE $this->table SET $values WHERE id_record = ?
                ";

            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $data['description_incident']);
            $stmt->bindValue(2, $id, PDO::PARAM_INT);
            $stmt->bindValue(3, $id, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            error_log('Record::update():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method sumHours
     *
     * @param $id $id [explicite description]
     * @param date $dateFrom fecha inicio
     * @param date $dateTo fecha inicio
     *
     * @return void
     */
    public function sumHours($id,$dateFrom,$dateTo)
    {
        try {
            $sql = "SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(end_record, begin_record)))) AS total
            FROM $this->table WHERE id_user=? AND DATE(begin_record)
            BETWEEN ? AND ?";
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);
            $stmt->bindValue(2, $dateFrom);
            $stmt->bindValue(3, $dateTo);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Record::getLastRow():' . $e->getMessage());
            return false;
        }
    }
}
