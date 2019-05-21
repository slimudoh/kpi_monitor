<template>
  <canvas id="active-pie-chart"></canvas>
</template>

<script>
  import {eventBus} from '../../../index';
  import Chart from 'chart.js';
  import activeChartData from './active-chart-data.js';

  export default {
    name: 'activePie',
    data() {
      return {
        activeChartData: activeChartData,
        indicatorValue: 0,
        salesValue: 0,
        month: null,
        lastMonth: null,
        companyTotal: [],
        monthlyCompanyMgrA: [],
        monthlyCompanyMgrB: [],
        monthlyActive: [],
        ServiceMonthlyDataForDb: {},
        activeRationA: 0,
        activeRationB: 0,
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
            this.indicatorValue = parseInt(data[index].service_mgr_client);
          }
        }
      },
      getMonthlySalesData(data) {
        for (let index in data) {
          if (data[index].staff_name.trim().toLowerCase() === "sola".toLowerCase()) {
            this.salesValue += parseInt(data[index].clients);
          }
        }
        this.getPercent();
      },
      getPercent() {
        activeChartData.data.labels[0] = "Target";
        activeChartData.data.labels[1] = "Active Clients";

        activeChartData.data.datasets[0].data[0] = this.indicatorValue;
        if (this.indicatorValue < (this.salesValue - 5)) {
          activeChartData.data.datasets[0].backgroundColor[0] = "#bf0006";
        } else if (this.indicatorValue < this.salesValue) {
          activeChartData.data.datasets[0].backgroundColor[0] = "#0b6623";
        } else {
          activeChartData.data.datasets[0].backgroundColor[0] = "#4cbb17";
        }

        activeChartData.data.datasets[0].data[1] = this.salesValue;
        if (this.salesValue < (this.indicatorValue - 5)) {
          activeChartData.data.datasets[0].backgroundColor[1] = "#bf0006";
        } else if (this.salesValue < this.indicatorValue) {
          activeChartData.data.datasets[0].backgroundColor[1] = "#0b6623";
        } else {
          activeChartData.data.datasets[0].backgroundColor[1] = "#4cbb17";
        }

        this.createChart('active-pie-chart', this.activeChartData);
      },
      getCompanyDataForTheMonth(data) {
        setTimeout(() => {
          this.CompanysManagedByManager(data);
        }, 35000);

        for (let index in data) {
          this.companyTotal.push(data[index].TITLE);
        }
      },
      CompanysManagedByManager(data) {
        setTimeout(() => {
          this.getActiveCompanyPreviousMonth(data);
        }, 40000);

        for (let index in data) {
            if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.sola)) {
              this.monthlyCompanyMgrB.push(data[index].TITLE);
            }
        }
      },
      getActiveCompanyPreviousMonth(data) {
        for (let index in data) {
          let date = new Date()
          let bitrixDay = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[2];
          let bitrixMonth = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[1];
          let bitrixYear = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[0];

          let bitrixDate = bitrixDay + "-" + bitrixMonth + "-" + bitrixYear;

          this.month = "0" + (date.getMonth() + 1);

          if ((date.getMonth() + 1).length < 2) {
            this.month = "0" + (date.getMonth() + 1);
          } else {
            this.month = "" + (date.getMonth() + 1);
          }


          if ((this.month - 1) < 10) {
            if (this.month == 1) {
              this.lastMonth = 12;
            } else {
              this.lastMonth = "0" + (this.month - 1);
            }
          } else {
            this.lastMonth = "" + (this.month - 1);
          }

          if (bitrixMonth == this.lastMonth) {
            this.monthlyActive.push(data[index].TITLE);
          }
        }

        if (this.monthlyActive.length  > 0) {
          this.activeRationA = this.monthlyActive.length / this.monthlyCompanyMgrA.length;
        }

        if (this.monthlyActive.length  > 0) {
          this.activeRationB = this.monthlyActive.length / this.monthlyCompanyMgrB.length;
        }

        console.log(this.activeRationA);
        console.log(this.activeRationB);

        this.ServiceMonthlyDataForDb = {
          value: "monthlyclients",
          company: this.companyTotal.length,
          sola: Math.floor(this.activeRationB),
        }

        console.log(this.ServiceMonthlyDataForDb);

        setTimeout(() => {
          this.sendMonthlyDataToDb(this.ServiceMonthlyDataForDb);
        }, 30000);


      },
      sendMonthlyDataToDb(data) {
        let body = data;
        this.$http.post(this.$store.state.Dbase + "update.php", body)
          .then(response => {
              let data = response.body;
            }
          )
          .catch(e => {
            }
          );
      },
    },
    created() {
      eventBus.$on("monthlyindicatorData", (data) => {
        this.getMonthlyIndicatorData(data);
      });
      eventBus.$on("companyData", (data) => {
        this.getCompanyDataForTheMonth(data);
      });
      eventBus.$on("salesMonthlyData", (data) => {
        this.getMonthlySalesData(data);
      });
    }
  }
</script>
