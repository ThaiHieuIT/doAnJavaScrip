<?php
require_once 'mysql.php';

function get_category_list(){
    $sql = 'SELECT * FROM CATEGORIES';
    $pdo = get_pdo();

    $stmt = $pdo->query($sql);
    $category_list = array();

    while ($row = $stmt->fetch()) {
        $category = array(
            'id' => $row['id'],
            'name' => $row['name']
        );

        array_push($category_list, $category);
    }
    
    return json_encode($category_list);
}

/**
 * Api for product
 */
function get_product_list(){ 
    $sql = 'SELECT * FROM PRODUCTS';
    $pdo = get_pdo();

    $stmt = $pdo->query($sql);
    $product_list = array();

    while ($row = $stmt->fetch()) {
        $product = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description'],
            'img' => $row['img'],
            'price' => $row['price'],
            'category_id' => $row['category_id']
        );

        array_push($product_list, $product);
    }
    
    return json_encode($product_list);
}

function get_product_list_by_category($category_id){
    $sql = 'SELECT * FROM PRODUCTS WHERE category_id=:category_id';
    $pdo = get_pdo();

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':category_id', $category_id);
    $stmt->execute();

    $product_list = array();

    while ($row = $stmt->fetch()) {
        $product = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'img' => $row['img'],
            'price' => $row['price'],
            'category_id' => $row['category_id']
        );
        array_push($product_list, $product);
    }

    return json_encode($product_list);
}

function get_product($product_id){
    $sql = 'SELECT * FROM PRODUCTS WHERE id=:id';
    $pdo = get_pdo();

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $product_id);
    $stmt->execute();

    while ($row = $stmt->fetch()) {
        $product = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'img' => $row['img'],
            'price' => $row['price'],
            'category_id' => $row['category_id']
        );

        return json_encode($product);
    }
    
    return json_encode(array());
}

function delete_product($id){
    $sql = 'DELETE FROM PRODUCTS WHERE ID=:id';
    $pdo = get_pdo();
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id);

    return $stmt->execute();
}
/**
 * Authentication
 */
function login($email, $password){
    $sql = 'SELECT * FROM USERS WHERE email=:email AND password=:password';
    $pdo = get_pdo();

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    while ($row = $stmt->fetch()) {
        $user = array(
            'id' => $row['id'],
            'email' => $row['email'],
            'password' => $row['password']
        );

        return $user;
    }
    
    return false;
}
function register($email, $password){
    $sql = 'INSERT INTO USERS (id, email, password) VALUES (null, :email, :password)';
    $pdo = get_pdo();

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();
    
    return false;
}

/**
 * Category api
 */
function delete_category($id){
    $sql = 'DELETE FROM CATEGORIES WHERE ID=:id';
    $pdo = get_pdo();
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id);

    return $stmt->execute();
}

function addCategory($category_name){
    $sql = 'INSERT INTO categories(ID,Name) VALUES(NULL, :category_name)';
    $pdo = get_pdo();

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':category_name', $category_name);
    return $stmt->execute();
}

// Sửa Category
function updateCategory($category_name_cu,$category_name){
    $sql = 'UPDATE categories SET name=:category_name where name=:category_name_cu';
    $pdo = get_pdo();

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':category_name_cu', $category_name_cu);
    $stmt->bindParam(':category_name', $category_name);
    return $stmt->execute();
}

function addProduct($product_name, $product_description, $product_img, $product_price, $category_id){
    $sql = 'INSERT INTO products(ID,Name,description,img,price,category_id) VALUES(NULL, :product_name, :product_description, :product_img, :product_price, :category_id)';
    $pdo = get_pdo();

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':product_name', $product_name);
    $stmt->bindParam(':product_description', $product_description);
    $stmt->bindParam(':product_img', $product_img);
    $stmt->bindParam(':product_price', $product_price);
    $stmt->bindParam(':category_id', $category_id);
    return $stmt->execute();
}
function updateProduct($product_name_cu, $product_name, $product_description, $product_img, $product_price, $category_id){
    $sql = 'UPDATE products SET name=:product_name, description=:product_description, img=:product_img, price=:product_price, category_id=:category_id WHERE name=:product_name_cu';
    $pdo = get_pdo();

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':product_name_cu', $product_name_cu);
    $stmt->bindParam(':product_name', $product_name);
    $stmt->bindParam(':product_description', $product_description);
    $stmt->bindParam(':product_img', $product_img);
    $stmt->bindParam(':product_price', $product_price);
    $stmt->bindParam(':category_id', $category_id);
    return $stmt->execute();
}
?>



