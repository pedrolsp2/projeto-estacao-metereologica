var statusLogin = true

/**************** PEGA O DIA ATUAL E POE NA TELA ****************/

var txtDate = document.getElementById('atualDay')
const dataAtual = new Date();
const dia = dataAtual.getDate();
const mes = dataAtual.toLocaleString('default', { month: 'long' });
const ano = dataAtual.getFullYear();

const dataFormatada = String(dia).length == 1 ? `0${dia} de ${mes} de ${ano}` : `${dia} de ${mes} de ${ano}`
txtDate.innerHTML = dataFormatada;

/**************** RESPONSIVIDADE ****************/

let dashboard = document.querySelector('aside')
let btnMob = document.querySelector('.hamburger-icon')


btnMob.addEventListener("click", () => {
  if (dashboard.id == 'true') {
    dashboard.id = 'false'
    dashboard.style.transform = 'translateX(0px)'
    btnMob.style.transform = 'translate(200px, 50px)'
  }
  else {
    dashboard.id = 'true'
    dashboard.style.transform = 'translateX(-350px)'
    btnMob.style.transform = 'translate(0)'
  }
})

/***************** JSON ********************/

var labelDate = [];
var dataLabelTemperature = [];
var dataLabelSolarRadiation = [];
var dataLabelRH = [];
var dataLabelDew_Point = [];
var dataLabelWind_Speed = [];
var dataLabelGust_Speed = [];
var dataLabelWind_Direction = [];
var dataLabelPressure = [];
var dataLabelRain = [];

const loadingElement = document.getElementById("skLoading");
const Elemento = document.getElementById("sectionGrafic");

fetch('../backend/grafic.php')
  .then(response => response.json())
  .then(data => {

    const querry = data.querry;

    for (let i = 0; i < querry.length; i++) {
      labelDate.push(querry[i].Date);
      dataLabelTemperature.push(parseFloat(querry[i].Temperature));
      dataLabelSolarRadiation.push(parseFloat(querry[i].Solar_Radiation));
      dataLabelRH.push(parseFloat(querry[i].RH));
      dataLabelDew_Point.push(parseFloat(querry[i].Dew_Point));
      dataLabelWind_Speed.push(parseFloat(querry[i].Wind_Speed));
      dataLabelGust_Speed.push(parseFloat(querry[i].Gust_Speed));
      dataLabelWind_Direction.push(parseFloat(querry[i].Wind_Direction));
      dataLabelPressure.push(parseFloat(querry[i].Pressure));
      dataLabelRain.push(parseFloat(querry[i].Rain));
    }

    loadingElement.remove();
    Elemento.classList.toggle('active');

    /**************************************************************/

    var arrayInfo =[
      ['temperatureChart','Temperatura','Temperatura', dataLabelTemperature],
      ['solarRadiationChart','Radiação Solar','Nível',dataLabelSolarRadiation],
      ['rhChart','Humidade Relativa','Nivel', dataLabelRH],
      ['DewPointChart','Ponto de condensação','Nivel', dataLabelDew_Point],
      ['WindSpeedChart','Velocidade do vento','Velocidade',dataLabelWind_Speed],
      ['GustSpeedChart','Velocidade da Rajada','Velocidade',dataLabelGust_Speed],
      ['WindDirectiondChart','Direção do vento','Velocidade',dataLabelWind_Direction],
      ['PressureChart','Pressão','Nivel',dataLabelPressure],
      ['rainChart','Probabilidade de chuva','Nivel',dataLabelRain]
    ]

    for (var i = 0; i < arrayInfo.length; i++) {
      const section = document.querySelector('#sectionGrafic');
      const figure = document.createElement('figure');
      section.appendChild(figure);
      figure.classList.add('highcharts-figure');
      const div = document.createElement('div');
      div.id = arrayInfo[i][0];
      figure.appendChild(div);

      chartGeneration(arrayInfo[i][0], arrayInfo[i][1], arrayInfo[i][2], arrayInfo[i][3]);
    }
    

  })


function chartGeneration(id,nameChart,labelChart,dataChart){
  Highcharts.chart(`${id}`, {
    chart: {
      zoomType: 'x',
      exporting: false // Desativa o menu de contexto
    },
    title: {
      text: `${nameChart}`,
      align: 'left'
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        'Clique e arraste para zoom de datas' : 'Toque e arraste para dar zoom nas datas',
      align: 'left'
    },
    xAxis: {
      categories: labelDate,
      type: 'date',
      dateTimeLabelFormats: {
        day: 'e% %b %y'
      },
      tickInterval: Math.ceil(labelDate.length / 30) // Define o espaçamento entre os ticks
    },
    yAxis: {
      title: {
        text: `${labelChart}`
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    lang: {
      contextButtonTitle: 'Menu',
      decimalPoint: ',',
      downloadJPEG: 'Baixar imagem JPEG',
      downloadPDF: 'Baixar arquivo PDF',
      downloadPNG: 'Baixar imagem PNG',
      downloadSVG: 'Baixar vetor SVG',
      loading: 'Carregando...',
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      noData: 'Sem dados para exibir',
      numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
      printChart: 'Imprimir gráfico',
      resetZoom: 'Redefinir zoom',
      resetZoomTitle: 'Redefinir zoom para o nível 1:1',
      shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      thousandsSep: '.',
      weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    },
    series: [{
      type: 'area',
      name: `${labelChart}`,
      data: dataChart
    }]
  });
}