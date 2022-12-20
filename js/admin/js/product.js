const BASE_URL = 'http://localhost/api/admin'
$(document).ready(function () {
    get_product_list()
})

function get_product_list(){
    $.getJSON(BASE_URL + '/product/index.php', function (data) {
        let product_list = JSON.parse(data)
        render_product(product_list)
    })
}

function render_product(product_list){
    let dom_product = document.getElementById('product_list')
    dom_product.innerHTML = '';

    product_list.forEach(product => {
        let product_node = create_product_node(product)
        dom_product.appendChild(product_node)
    });
}


function create_product_node(product){
    let root = document.createElement('tr')

    //Tạo thẻ ID sản phẩm
    let pro_id = document.createElement('td')
    pro_id.textContent = product.id
    root.appendChild(pro_id)

    //Tạo thẻ tên sản phẩm
    let pro_name = document.createElement('td')
    pro_name.textContent = product.name
    root.appendChild(pro_name)
    
    //Tạo thẻ đơn vị tính của sản phẩm
    let pro_description = document.createElement('td')
    pro_description.textContent = product.description
    root.appendChild(pro_description)
    
    //Tạo thẻ ảnh của sản phẩm
    let pro_img = document.createElement('td')
    let img = document.createElement('img')
    img.setAttribute('class', 'product-img')
    img.setAttribute('src', "../public/img/" + product.img)
    pro_img.appendChild(img)
    root.appendChild(pro_img)

    //Tảo thẻ giá của sản phẩm
    let pro_price = document.createElement('td')
    pro_price.textContent = product.price
    root.appendChild(pro_price)
    
    //Tạo nút Edit
    let wrap_btn_edit = document.createElement('td')
    let btn_edit = document.createElement('button')
    btn_edit.innerText  = "Edit"
    btn_edit.setAttribute("class", "btn-primary")
    btn_edit.onclick = function(){
        window.location = 'edit.html'
    }
    wrap_btn_edit.appendChild(btn_edit)
    root.appendChild(wrap_btn_edit)
    
    //Tạo nút Delete
    let wrap_btn_delete = document.createElement('td')
    let btn_delete = document.createElement('button')
    btn_delete.innerText  = "Delete"
    btn_delete.setAttribute("class", "btn-danger")
    btn_delete.onclick = function(){
        delete_product(product.id)
    }
    wrap_btn_delete.appendChild(btn_delete)
    root.appendChild(wrap_btn_delete)
    return root
}

function delete_product(id){
    $.getJSON(BASE_URL + '/product/delete.php?id=' + id, function (data) {
        if(data.status == true){
            location.reload();
        }else{
            alert('Failed delete')
        }
    })
}
//Thêm Product
function doCreateProduct(){
    let product_name = document.getElementById('product_name')
    let product_description = document.getElementById('product_description')
    let product_img = document.getElementById('product_img')
    let product_price = document.getElementById('product_price')
    let category_id = document.getElementById('category_id')
    if(product_name.value=="" || product_description.value=="" || product_img.value=="" || product_price.value=="" || category_id.value==""){
        alert('Vui Lòng Nhập Đủ Thông Tin')
        return false
    }else{
        product_name = document.getElementById('product_name').value
        product_description = document.getElementById('product_description').value
        product_img = document.getElementById('product_img').value
        product_price = document.getElementById('product_price').value
        category_id = document.getElementById('category_id').value
    }
    addProduct(product_name, product_description, product_img, product_price,category_id)
}

function addProduct(product_name, product_description, product_img, product_price,category_id){
    let params = {'product_name' : product_name ,'product_description': product_description, 'product_img' : product_img, 'product_price' : product_price, 'category_id' : category_id}
    $.post(BASE_URL +'/product/create.php', params, function(data){
        let res = JSON.parse(data)
        if(res.code == true){
            alert('Lỗi')
        }else{
            alert('Thêm Thành Công')
            window.location = 'index.html'
        }
    })
}

//Sửa Product
function doUpdateProduct(){
    let product_name_cu = document.getElementById('product_name_cu')
    let product_name = document.getElementById('product_name')
    let product_description = document.getElementById('product_description')
    let product_img = document.getElementById('product_img')
    let product_price = document.getElementById('product_price')
    let category_id = document.getElementById('category_id')
    if(product_name_cu.value=="" || product_name.value=="" || product_description.value=="" || product_img.value=="" || product_price.value=="" || category_id.value==""){
        alert('Vui Lòng Nhập Đủ Thông Tin')
        return false
    }else{
        product_name_cu = document.getElementById('product_name_cu').value
        product_name = document.getElementById('product_name').value
        product_description = document.getElementById('product_description').value
        product_img = document.getElementById('product_img').value
        product_price = document.getElementById('product_price').value
        category_id = document.getElementById('category_id').value
    }
    updateProduct(product_name_cu, product_name, product_description, product_img, product_price,category_id)
}

function updateProduct(product_name_cu, product_name, product_description, product_img, product_price,category_id){
    let params = {'product_name_cu': product_name_cu, 'product_name' : product_name ,'product_description': product_description, 'product_img' : product_img, 'product_price' : product_price, 'category_id' : category_id}
    $.post(BASE_URL +'/product/update.php', params, function(data){
        let res = JSON.parse(data)
        if(res.code == true){
            alert('Lỗi')
        }else{
            alert('Update Thành Công')
            window.location = 'index.html'
        }
    })
}
