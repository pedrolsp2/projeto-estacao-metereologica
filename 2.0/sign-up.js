let agora = new Date();
let hora = agora.getHours();
let minutos = agora.getMinutes();

document.getElementById("boasVindas").innerHTML = hora > 12 ? "Boa tarde!" : "Bom dia!"
