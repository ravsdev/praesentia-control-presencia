<?php
/**
 * Interfaz que define el modelo
 */
interface IModel{
    public function getAll($cols);
    public function get($id,$cols);
    public function insert($data);
    public function delete($id);
    public function update($id,$data);
}