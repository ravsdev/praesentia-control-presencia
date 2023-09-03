<?php

/**
 * Clase Connection
 * Establece la conexión con la base de datos
 */
class Connection extends PDO
{
	//Propiedades
	private $connection;
	private $host;
	private $port;
	private $db;
	private $username;
	private $password;

	/**
	 * Método constructor
	 */
	public function __construct()
	{
		$this->connection = DB_CONNECTION;
		$this->host = DB_HOST;
		$this->port = DB_PORT;
		$this->db = DB_DATABASE;
		$this->username = DB_USERNAME;
		$this->password = DB_PASSWORD;
		
		try {
			parent::__construct("$this->connection:host=$this->host;port=$this->port;dbname=$this->db", $this->username, $this->password);
			$this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $e) {
			die("Connection::construct : " . $e->getMessage());
		}
	}
	
	/**
	 * Method getDatabase
	 *
	 * @return PDO
	 */
	public function getDatabase()
	{
		return $this->db;
	}
}
