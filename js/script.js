/**************** PEGA O DIA ATUAL E POE NA TELA ****************/

var txtDate = document.getElementById('atualDay')
const dataAtual = new Date();
const dia = dataAtual.getDate();
const mes = dataAtual.toLocaleString('default', { month: 'long' });
const ano = dataAtual.getFullYear();

const dataFormatada = `${dia} de ${mes} de ${ano}`;
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

var labelTemperature = [];
var dataLabelTemperature = [];

var labelSolarRadiation = [];
var dataLabelSolarRadiation = [];

var labelRH = [];
var dataLabelRH = [];

const loadingElement = document.getElementById("skLoading");
const Elemento = document.getElementById("sectionGrafic");

fetch('../backend/grafic.php')
    .then(response => response.json())
    .then(data => {

        const dataTemperature = data.temperature;
        const dataSolarRadiation = data.solarRadiation;
        const dataRh = data.rh;

        for (let i = 0; i < dataTemperature.length; i++) {
            labelTemperature.push(dataTemperature[i].date);
            dataLabelTemperature.push(parseInt(dataTemperature[i].temperature));
        }

        for (let i = 0; i < dataSolarRadiation.length; i++) {
            labelSolarRadiation.push(`${dataSolarRadiation[i].date}`);
            dataLabelSolarRadiation.push(parseInt(dataSolarRadiation[i].Solar_Radiation));
        }

        for (let i = 0; i < dataRh.length; i++) {
            labelRH.push(`${dataRh[i].date}`);
            dataLabelRH.push(parseInt(dataRh[i].RH));
        }

        loadingElement.remove();
        Elemento.classList.toggle('active');

        /**************************************************************/

        Highcharts.chart('temperatureChart', {
            chart: {
              zoomType: 'x'
            },
            title: {
              text: 'Temperatura',
              align: 'left'
            },
            subtitle: {
              text: document.ontouchstart === undefined ?
                'Clique e arraste para zoom de datas' : 'Pinch the chart to zoom in',
              align: 'left'
            },
            xAxis: {
              categories: labelTemperature,
              type: 'date',
              dateTimeLabelFormats: {
                day: 'e% %b %y'
              }
            },
            xAxis: {
                categories: labelTemperature,
                type: 'date',
                dateTimeLabelFormats: {
                  day: 'e% %b %y'
                },
                tickInterval: Math.ceil(labelTemperature.length / 30) // Define o espaçamento entre os ticks
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
            series: [{
              type: 'area',
              name: 'Temperatura',
              data: dataLabelTemperature
            }]
          });   

          /**************************************************************/
  
          Highcharts.chart('solarRadiationChart', {
              chart: {
                zoomType: 'x'
              },
              title: {
                text: 'Radiação Solar',
                align: 'left'
              },
              subtitle: {
                text: document.ontouchstart === undefined ?
                  'Clique e arraste para zoom de datas' : 'Pinch the chart to zoom in',
                align: 'left'
              },
              xAxis: {
                categories: labelSolarRadiation,
                type: 'date',
                dateTimeLabelFormats: {
                  day: 'e% %b %y'
                },
                tickInterval: Math.ceil(labelTemperature.length / 30) // Define o espaçamento entre os ticks
              },
              yAxis: {
                title: {
                  text: 'Radiação Solar'
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
              series: [{
                type: 'area',
                name: 'Radiação Solar',
                data: dataLabelSolarRadiation
              }]
            });   

            /**************************************************************/
    
            Highcharts.chart('rhChart', {
                chart: {
                  zoomType: 'x'
                },
                title: {
                  text: 'RH',
                  align: 'left'
                },
                subtitle: {
                  text: document.ontouchstart === undefined ?
                    'Clique e arraste para zoom de datas' : 'Pinch the chart to zoom in',
                  align: 'left'
                },
                xAxis: {
                  categories: labelRH,
                  type: 'date',
                  dateTimeLabelFormats: {
                    day: 'e% %b %y'
                  },
                  tickInterval: Math.ceil(labelTemperature.length / 30) // Define o espaçamento entre os ticks
                },
                yAxis: {
                  title: {
                    text: 'RH'
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
                series: [{
                  type: 'area',
                  name: 'RH',
                  data: dataLabelRH
                }]
              });   
    })



