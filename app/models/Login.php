<?php

/**
 * Clase Login
 * Comprueba si los datos de inicio de sesión corresponden con los
 * de la base de datos.
 */
class Login extends Model
{
    
    /**
     * Method __construct
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->setTable("users");
    }
    
    /**
     * Method login
     *
     * @param string $email correo electrónico
     * @param string $password contraseña
     *
     * @return array|boolean
     */
    public function login($email, $password='')
    {
        try {
            $sql = "SELECT u.*, r.name_role FROM users u JOIN roles r ON r.id_role = u.role_user WHERE email_user = :email";
            $stmt = $this->database->prepare($sql);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() != 1) {
                $user = null;
            } else {
                $data = $stmt->fetch(PDO::FETCH_ASSOC);

                if (password_verify($password, $data['password_user'])) {
                    $user = new User();
                    $user->setData($data);
                } else {
                    $user = false;
                }
            }

            return $user;
        } catch (PDOException $e) {
            error_log('Login::login():' . $e->getMessage());
            return false;
        }
    }
}
