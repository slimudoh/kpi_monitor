const telesalesAssignedChart = {
    type: 'bar',
    data: {
      // labels: ["none", "none"],
      labels: ["none"],
      datasets: [
        {
          // data: [0, 0],
          data: [0],
          backgroundColor: [
            '#bf0006',
            // '#4CBB17', 
          ],
          borderWidth: 0
        }
      ],
    },
    options: {
      barValueSpacing: 10,
      legend: {
        display: false,
        labels: {}
      },
      tooltips: {
        enabled: false,
        callbacks: {
          label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
        title: () => null,
    }
  },
  responsive:
true,
  lineTension:
1,
animation: {
  duration: 2000,
  onComplete: function () {
      var chartInstance = this.chart,
          ctx = chartInstance.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
              var data = dataset.data[index];                            
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
      });
  }
},
scales: {
  yAxes: [{
    ticks: {
      beginAtZero: true,
      max: 100,
      padding: 25,
      fontFamily: "Montserrat, sans-serif",
      fontColor: '#000',
    }
  }],
    xAxes:
  [{
    ticks: {
      fontFamily: "Montserrat, sans-serif",
      fontColor: '#000',
    },
    barPercentage: 0.7,
    categoryPercentage: 0.6,
  }]
}
}
}

export default telesalesAssignedChart;
