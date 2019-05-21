export const salesAssociateChartData = {
    type: 'pie',
    data: {
      labels: ['none', 'none'],
      datasets: [
        {
          data: [0, 0],
          backgroundColor: [
            'none', 
            'none', 
          ],
          borderWidth: 0
        }
      ]
    },
    options: {
      tooltips: {
        enabled: false,
        callbacks: {
          label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
        title: () => null,
    }
  },
  events:
false,
  animation:
{
  duration: 2000,
    easing:
  "easeOutQuart",
    onComplete:

  function () {
    var ctx = this.chart.ctx;
    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    this.data.datasets.forEach(function (dataset) {
      for (var i = 0; i < dataset.data.length; i++) {
        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
          total = dataset._meta[Object.keys(dataset._meta)[0]].total,
          mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
          start_angle = model.startAngle,
          end_angle = model.endAngle,
          mid_angle = start_angle + (end_angle - start_angle) / 2;

        var x = mid_radius * Math.cos(mid_angle);
        var y = mid_radius * Math.sin(mid_angle);

        ctx.fillStyle = '#fff';
        if (i == 3) {
          ctx.fillStyle = '#444';
        }
        // var percent = String(Math.round(dataset.data[i] / total * 100)) + "%";
        var percent = dataset.data[i];
        ctx.fillText(percent, model.x + x, model.y + y + 15);
      }
    });
  }
}
,
}
}

export default salesAssociateChartData;
