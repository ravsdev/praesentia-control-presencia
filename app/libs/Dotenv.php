<?php

/**
 * Clase DotEnv
 * 
 * Clase que nos permite cargar la configuración de la aplicación en variables de entorno
 */
class DotEnv
{	
	/**
	 * Method load
	 *
	 * @return void
	 */
	public static function load()
	{
		if (!file_exists('.env')) {
			throw new \InvalidArgumentException(sprintf('File does not exist'));
		}

		$file = file('.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

		foreach ($file as $line) {
			$newEnv = trim($line);
			//echo 
			if (substr($newEnv, 0, 1) != '#'){
				//Definimos como constante
				$value=explode('=',$line);
				define($value[0],$value[1]);

				//También lo añadimos como variable de entorno
				putenv($newEnv);
			}
		}
	}
}
