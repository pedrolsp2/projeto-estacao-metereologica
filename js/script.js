/**************** PEGA O DIA ATUAL E POE NA TELA ***************/

var txtDate = document.getElementById('atualDay')
var txtDates = document.getElementById('atualDays')
const dataAtual = new Date();
const dia = dataAtual.getDate();
const mes = dataAtual.toLocaleString('default', { month: 'long' }); 

let dataFormatada = '';

function atualizarRelogio() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.toLocaleString('default', { month: 'long' });
  const hora = formatarNumero(dataAtual.getHours());
  const minuto = formatarNumero(dataAtual.getMinutes());
  
  dataFormatada = String(dia).length == 1 ? `0${dia} de ${mes}` : `${dia} de ${mes}, ${hora}:${minuto}`;
   
  txtDate.textContent = dataFormatada;
  txtDates.textContent = dataFormatada;
}

function formatarNumero(numero) {
  return numero < 10 ? '0' + numero : numero;
}

setInterval(atualizarRelogio, 1000);


/**************** RESPONSIVIDADE **************/
 
var btnMob = document.querySelector('#btnMob');

btnMob.addEventListener("click", () => {
  if (btnMob.innerHTML === "close") {
    btnMob.innerHTML = "menu";
  } else {
    btnMob.innerHTML = "close";
  }
});

var topNav = document.querySelector('.top-nav');
var nav = document.querySelector('nav');

window.addEventListener("scroll", function() {
  var topNavHeight = topNav.offsetHeight;
  
  if (window.pageYOffset >= topNavHeight) {
    nav.style.position = "fixed";
    nav.style.top = "0";
  } else {
    nav.style.position = "static";
  }
});

/************CARROSSEL****************** */
 
document.addEventListener("DOMContentLoaded", function() {
  const carouselContainer = document.querySelector(".carousel-container");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  function showItem(index) {
    if (index < 0 || index >= carouselItems.length) return;
    carouselContainer.style.transform = `translateX(-${index * 33.3333}%)`;
    setCurrentDot(index);
  }

  function setCurrentDot(index) {
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function prevSlide(event) {
    event.preventDefault();
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showItem(currentIndex);
  }

  function btnNextSlide(event) {
    event.preventDefault();
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showItem(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showItem(currentIndex);
  } 
  

  function startInterval() {
    intervalId = setInterval(()=> {
      nextSlide();
    }, 10000); // Transição automática a cada 3 segundos (3000 ms)
  }

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", btnNextSlide); 

  startInterval();
  
}); 

/****************************************** 

function checkTemperature(temperatura, probabilidadeChuva) {

  const icon_Card = document.getElementById('icon-temp')

  if (temperatura >= 30) {
    icon_Card.innerHTML = "sunny"
  } else if (temperatura >= 20 && probabilidadeChuva < 0.5) {
    icon_Card.innerHTML = "partly_cloudy_day"
  } else if (temperatura >= 10 && probabilidadeChuva >= 0.5) {
    icon_Card.innerHTML = "beach_access"
  } else {
    icon_Card.innerHTML = "flare"
  }
}

const temperatura = 30;
const probabilidadeChuva = 0.3;

const svg = checkTemperature(temperatura, probabilidadeChuva);

/******************* INFO TEMPO ************************/

let txtTemperature = document.getElementById('atualTemp')
let txtTemperatureSen = document.getElementById('sen')
let txtTemperatureNav = document.getElementById('txtTemperatureNav')
let atualTempRain =  document.getElementById('atualTempRain')

fetch('../backend/grafic.php')
.then(response => response.json())
.then(data => {

  const querry = data.cardData;
  txtTemperature.innerHTML = `${data.Temperature} °`
  txtTemperatureNav = `${data.Temperature} °`
  txtTemperatureSen = `${data.Temperature} °`
  atualTempRain = `${data.chuva} °`

})