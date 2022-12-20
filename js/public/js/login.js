const BASE_URL = 'http://localhost/api/'

function doLogin(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    login(email, password)
}

function login(email, password){
    let params = {'email': email, 'password': password}
    $.post(BASE_URL + 'login.php', params, function(data){
        let res = JSON.parse(data)
        if(res.code == 200){
            window.location = 'index.html'
        }else{
            alert('Login Failed')
        }
    })
}
function doRegister() {
    let email = document.getElementById('email')
    let password = document.getElementById('password')
    if(email.value==""){
        alert('Vui Lòng Nhập Email')
        return false
    }else{
        email = document.getElementById('email').value
    }
    if(password.value==""){
        alert('Vui Lòng Nhập Password')
        return false
    }else{
        password = document.getElementById('password').value
    }
    register(email, password)
}

function register(email, password) {
    let params = { 'email': email, 'password': password }
    $.post(BASE_URL + '/register.php', params, function (data) {
        let res = JSON.parse(data)
        if (res.code == true) {
            alert('Register Failed');
        } else 
            alert('Đăng Kí Thành Công')
            window.location = 'login.html'
    })
}
