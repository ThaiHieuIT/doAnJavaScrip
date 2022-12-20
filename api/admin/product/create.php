<?php
require_once '../../core/function.php';
header('Access-Control-Allow-Origin: *');

$product_name = $_POST['product_name'];
$product_description = $_POST['product_description'];
$product_img = $_POST['product_img'];
$product_price = $_POST['product_price'];
$category_id = $_POST['category_id'];

$bool = addProduct($product_name, $product_description, $product_img, $product_price, $category_id);

$response = array(
    'status' => $bool
);

echo json_encode($response);
?>