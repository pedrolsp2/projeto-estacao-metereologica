/* VERIFICA SE O INPUT SENHA É SUPORTAVEL NO NAVEGADOR, CASO NAO APAREÇA O OLHO DE SENHA */


var inputSenha = document.querySelector('input[type="password"]');
var imgSenha = document.getElementById('show-password');

imgSenha.addEventListener('click', function () {
    if (inputSenha.type === "password") {
        inputSenha.type = "text";
    } else {
        inputSenha.type = "password";
    }
});