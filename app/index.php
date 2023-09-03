<?php
//Importamos el archivo de inicialización
require_once 'core/init.php';

//Control de errores
error_reporting(E_ALL);
ini_set('ignore_repeated_errors', TRUE);
ini_set('display_errors', TRUE); //Dev
//ini_set('display_errors', FALSE); //Production
ini_set('log_errors', TRUE);
ini_set('error_log', __DIR__ . '/php-error.log');
// error_log("Praesentia error log");

//Iniciamos el enrutador
Route::root();
