<?php
require_once 'imodel.php';

/**
 * Clase Model
 * 
 * Encargada de hacer consultas a la base de datos.
 */
class Model implements IModel
{
    public $database;
    public $table;
    public $colSuffix;
   
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->database = new Connection();
    }
   
    /**
     * Method setTable
     * Establece la tabla en la base de datos a la que corresponde el modelo
     * @param string $table nombre de la tabla en la base de datos
     *
     * @return void
     */
    public function setTable($table='')
    {
        $this->table = $table;
        $this->colSuffix = rtrim($table, 's');
    }
    
    /**
     * Method count
     * 
     * Cuenta el número de filas
     * 
     * @return array|boolean
     */
    public function count(){
        try {
            $sql = "SELECT COUNT(*) as Total FROM $this->table";
            $stmt = $this->database->prepare($sql);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Model::count():' . $e->getMessage());
            return false;
        }
    }
 
    /**
     * Method getAll
     * Método genérico para todos los modelos con el que se obtienen todos las filas de la tabla
     * @param string $select columnas a seleccionar
     *
     * @return array|boolean
     */
    public function getAll($select)
    {
        try {
            $sql = "SELECT $select FROM $this->table";
            $stmt = $this->database->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Model::getAll():' . $e->getMessage());
            return false;
        }
    }

    /**
     * Método genérico para todos los modelos con el que se obtiene un resultado en concreto
     * @param $id 
     * 
     * @return array|boolean
     */
    public function get($id, $select)
    {
        try {
            $sql = "SELECT $select FROM $this->table WHERE id_$this->colSuffix = ?";
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Model::get():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method insert
     * Método genérico para todos los modelos con el que se insertan filas en la base de datos.
     *
     * @param array $data columnas y valores a insertar
     *
     * @return array|boolean
     */
    public function insert($data=[])
    {
        try {
            $columns = array_keys($data);
            $values = array_values($data);
            $sql = "INSERT INTO $this->table (" . implode(",", $columns) . ") VALUES(" . rtrim(str_repeat("?,", count($columns)), ',') . ")";

            $stmt = $this->database->prepare($sql);
            foreach ($values as $key => $value) {
                $stmt->bindValue($key + 1, $value);
            }
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log('Model::insert():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method update
     * Método genérico para todos los modelos con el que se actualiza una fila en concreto
     *
     * @param array $data valores
     * @param integer $id id de usuario
     *
     * @return array|boolean
     */
    public function update($data, $id)
    {
        try {
            $values = '';

            foreach ($data as $key => $value) {
                $values .= "$key = '$value',";
            }

            $values = rtrim($values, ',');

            $sql = "UPDATE $this->table SET $values WHERE id_user = ?";
  
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            error_log('Model::update():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method delete
     * Método genérico para todos los modelos con el que se elimina una fila en concreto
     *
     * @param integer $id id de usuario
     *
     * @return array|boolean
     */
    public function delete($id)
    {
        try {
            $sql = "DELETE FROM $this->table WHERE id_$this->colSuffix = ?";
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->rowCount()>0 ? true : false;
        } catch (PDOException $e) {
            error_log('Model::delete():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method getColumns
     *
     * @return array|boolean
     */
    public function getColumns()
    {
        try {
            $sql = "DESCRIBE $this->table";
            $stmt = $this->database->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (PDOException $e) {
            error_log('Model::getColumns():' . $e->getMessage());
            return false;
        }
    }
}
