<?php

/**
 * Clase User
 * Gestiona los usuarios en la base de datos.
 * 
 */
class User extends Model
{
    //Propiedades
    private $id;
    private $name;
    private $lastName;
    private $dni;
    private $email;
    private $password;
    private $active;
    private $role;
    
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->setTable("users");

        $this->id = null;
        $this->name = null;
        $this->lastName = null;
        $this->dni = null;
        $this->email = null;
        $this->password = null;
        $this->active = null;
        $this->role = null;
    }
    
    /**
     * Method setData
     *
     * @param array $data
     *
     * @return void
     */
    public function setData($data)
    {
        $this->id = $data['id_user'];
        $this->name = $data['name_user'];
        $this->lastName = $data['last_name_user'];
        $this->dni = $data['dni_user'];
        $this->email = $data['email_user'];
        $this->password = $data['password_user'];
        $this->active = $data['active_user'];
        $this->role = $data['name_role'];
    }
    
    /**
     * Method getId
     *
     * @return number
     */
    public function getId()
    {
        return $this->id;
    }
    
    /**
     * Method getName
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * Method getEmail
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }
    
    /**
     * Method getActive
     *
     * @return number
     */
    public function getActive()
    {
        return $this->active;
    }
    
    /**
     * Method getRole
     *
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }
    
    /**
     * Method countRoles
     *
     * @param string $role roles
     *
     * @return int|boolean
     */
    public function countRoles($role)
    {
        try {
            $sql = "SELECT COUNT(*) as Total FROM $this->table
                    WHERE role_user = (SELECT id_role FROM roles WHERE name_role=?)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $role);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Model::countRoles():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method getLatest
     *
     * @param string $cols columnas
     * @param integer $num 
     *
     * @return void
     */
    public function getLatest($cols, $num)
    {
        try {
            $select = $cols ?? '*';
            $sql = "SELECT $select FROM $this->table ORDER BY created_user DESC LIMIT ?";
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
     * Method getUsers
     *
     * @param string $cols columnas
     * @param string $role
     *
     * @return void
     */
    public function getUsers($cols, $role)
    {
        try {
            $select = $cols ?? '*';
            $sql = "SELECT $select FROM $this->table WHERE NOT role_user=(SELECT id_role FROM roles WHERE name_role=?)";
            $stmt = $this->database->prepare($sql);
            $stmt->bindValue(1, $role);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log('Model::getAll():' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Method insertUser
     *
     * @param array $data
     *
     * @return void
     */
    public function insertUser($data)
    {
        try {
            $dataMod = $data;
            $dataMod['password_user'] = password_hash($data['password_user'], PASSWORD_BCRYPT);
            return $this->insert($dataMod);
        } catch (PDOException $e) {
            error_log('Model::insert():' . $e->getMessage());
        }
    }
        
    /**
     * Method updateUser
     *
     * @param string $data
     * @param integer $id
     *
     * @return void
     */
    public function updateUser($data, $id)
    {
        try {
            $dataMod = $data;
            if (isset($dataMod['password_user']))
                $dataMod['password_user'] = password_hash($data['password_user'], PASSWORD_BCRYPT);
            return $this->update($dataMod, $id);
        } catch (PDOException $e) {
            error_log('Model::insert():' . $e->getMessage());
        }
    }  
      
    /**
     * Method toggleActive
     *
     * @param integer $id
     *
     * @return void
     */
    public function toggleActive($id)
    {
        return $this->get($id, 'active');
    }
}