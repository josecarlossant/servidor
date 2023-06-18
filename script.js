var myChart; // Variable global para almacenar el objeto del gráfico

function graficarFuncion() {
  // Obtener la expresión de la función ingresada por el usuario
  var input = document.getElementById('functionInput').value;

  // Obtener los límites del intervalo
  var lowerLimit = parseFloat(document.getElementById('lowerLimitInput').value);
  var upperLimit = parseFloat(document.getElementById('upperLimitInput').value);

  // Crear una función a partir de la expresión utilizando Math.js
  var funcion = math.compile(input);

  // Crear un array de valores x en el rango deseado
  var x = math.range(lowerLimit, upperLimit, 0.1).toArray();

  // Evaluar la función para cada valor de x
  var y = x.map(function (valor) {
    var scope = { x: valor };
    return funcion.evaluate(scope);
  });

  // Crear los datos y opciones para el gráfico
  var data = {
    labels: x,
    datasets: [{
      label: input,
      data: y,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1
    }]
  };

  var options = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      },
      y: {
        beginAtZero: true
      }
    }
  };

  // Limpiar el gráfico existente si hay uno
  if (myChart) {
    myChart.destroy();
  }

  // Crear el gráfico utilizando Chart.js
  var ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });
}
