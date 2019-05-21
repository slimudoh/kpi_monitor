<template>
  <canvas id="salesassociate-pie-chart"></canvas>
</template>

<script>
import { eventBus } from '../../../index';
  import Chart from 'chart.js';
  import salesAssociateChartData from './salesassociate-chart-data.js';


  export default {
    name: 'SalesAssociatePie',
    data() {
      return {
        salesAssociateChartData: salesAssociateChartData,
        indicatorValue: 0,
        salesValue: 0,
      }
    },
    methods: {
      createChart(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const myChart = new Chart(ctx, {
          type: chartData.type,
          data: chartData.data,
          options: chartData.options,
        });
      },
      getMonthlyIndicatorData(data) {
        for (let index in data) {
          if (data[index].period.trim() === "monthly".trim()) {
            this.indicatorValue = parseInt(data[index].sales_target_a)  +  parseInt(data[index].sales_target_b);
          }
        }
      },
      getMonthlySalesData(data) {

        for (let index in data) {
          if (data[index].staff_name.trim().toLowerCase() === "richard".toLowerCase()) {
            this.salesValue =  parseInt(data[index].deal_closed);
          }
          if (data[index].staff_name.trim().toLowerCase() === "jeremiah".toLowerCase()) {
            this.salesValue +=   parseInt(data[index].deal_closed);
          }
          // if (data[index].staff_name.trim().toLowerCase() === "dike".toLowerCase()) {
          //   this.salesValue +=   parseInt(data[index].deal_closed);
          // }
        }

        this.getPercent();
      },
      getPercent() {
        salesAssociateChartData.data.labels[0] = "REVENUE TARGET";
        salesAssociateChartData.data.labels[1] = "REVENUE MET";

        salesAssociateChartData.data.datasets[0].data[0] = this.indicatorValue;
        if (this.indicatorValue < (this.salesValue - 5)) {
          salesAssociateChartData.data.datasets[0].backgroundColor[0] = "#bf0006";
        } else if (this.indicatorValue < this.salesValue ) {
          salesAssociateChartData.data.datasets[0].backgroundColor[0] = "#0b6623";
        } else {
          salesAssociateChartData.data.datasets[0].backgroundColor[0] = "#4cbb17";
        }

        salesAssociateChartData.data.datasets[0].data[1] =  this.salesValue;
        if (this.salesValue < (this.indicatorValue - 5)) {
          salesAssociateChartData.data.datasets[0].backgroundColor[1] = "#bf0006";
        } else if (this.salesValue < this.indicatorValue ) {
          salesAssociateChartData.data.datasets[0].backgroundColor[1] = "#0b6623";
        } else {
          salesAssociateChartData.data.datasets[0].backgroundColor[1] = "#4cbb17";
        }

        this.createChart('salesassociate-pie-chart', this.salesAssociateChartData);
      },
    },
    created() {
      eventBus.$on("monthlyindicatorData", (data) => {
        this.getMonthlyIndicatorData(data);
      });
       eventBus.$on("salesMonthlyData", (data) => {
        this.getMonthlySalesData(data);
      });
    }
  }
</script>
