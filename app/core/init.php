<?php
//Inicializa la API

/*header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");*/

header("Content-Type: application/json; charset=UTF-8");

//Libs
require_once 'libs/dotenv.php';

//Cargamos variable de entorno y las constantes
DotEnv::load();

//App classes
require_once 'core/Errors.php';
require_once 'core/Connection.php';
require_once 'core/Model.php';
require_once 'core/Controller.php';
require_once 'core/Route.php';
require_once 'core/Session.php';

//Models
require_once 'models/Incident.php';
require_once 'models/Login.php';
require_once 'models/Record.php';
require_once 'models/User.php';

//Controllers
require_once 'controllers/IncidentController.php';
require_once 'controllers/LoginController.php';
require_once 'controllers/RecordController.php';
require_once 'controllers/UserController.php';