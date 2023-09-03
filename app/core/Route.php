<?php

/**
 * Clase Route
 * Se encarga de, según la petición recibida, redirigir al controlador correspondiente.
 */
class Route
{    
    /**
     * Method root
     *
     * @return void
     */
    public static function root()
    {
        $route = $_GET['nav'] ?? 'login';
        $route = explode("/", trim($route, "/"));
        $controllerName = self::camelCase($route[0]) . 'Controller' ?? null;
        $method = $route[1] ?? 'main';
        $params = count($_GET)>1 ? $_GET : null;

        $controllerFile = 'controllers/' . $controllerName . '.php';

        if (file_exists($controllerFile)) {
            require_once $controllerFile;
            $controller = new $controllerName();
 
            if (method_exists($controller, $method)) {
                if (isset($params)) {
                    unset($params['nav']);

                    $controller->$method($params);                    
                } else {
                    $controller->$method();
                }
            } else {
                $json = array(
                    'status' => 400,
                    'data' => 'Bad Request'
                );
                
                echo json_encode($json, http_response_code($json['status']));
            }
        } else {
            $json = array(
                'status' => 400,
                'data' => 'Bad Request'
            );
            
            echo json_encode($json, http_response_code($json['status']));
        }
    }
    
    /**
     * Method camelCase
     *
     * @param string $str texto
     *
     * @return string
     */
    private static function camelCase($str='')
    {
        return ucfirst(strtolower($str));
    }
}
