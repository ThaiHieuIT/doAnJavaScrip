<?php
require_once '../../core/function.php';
header('Access-Control-Allow-Origin: *');

$category_name_cu = $_POST['category_name_cu'];
$category_name = $_POST['category_name'];

$bool = updateCategory($category_name_cu,$category_name);

$response = array(
    'status' => $bool
);

echo json_encode($response);
?>