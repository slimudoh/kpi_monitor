<template>
  <canvas id="telesalesprocessed-chart"></canvas>
</template>

<script>
  import { eventBus } from '../../../index';
  import Chart from 'chart.js';
  import telesalesProcessedChart from './telesales-chart.js';

  export default {
    name: 'TelesalesProcessed',
    data() {
      return {
        telesalesProcessedChart: telesalesProcessedChart,
        weeklyTeleSalesA: [],
        weeklyTeleSalesB: [],
        monthlyTeleSalesA: [],
        monthlyTeleSalesB: [],
        teleSalesWeeklyDataForDb: {},
        teleSalesMonthlyDataForDb: {},
        lastMondayDay: null,
        lastMondayMonth: null,
        chartColor: 0,
        telesalesAMonthlyOldData: null,
        telesalesBMonthlyOldData: null,
        telesalesAWeeklyOldData: null,
        telesalesBWeeklyOldData: null,
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
      getBitrixDataForTheWeek(data) {
        setTimeout(() => {
          this.getBitrixDataForTheMonthly(data);
        }, 30000);
         

        for (let index in data) {

          let date = new Date()
          let bitrixDay = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[2];
          let bitrixMonth = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[1];
          let bitrixYear = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[0];
          let bitrixDate = bitrixDay + "-" + bitrixMonth + "-" + bitrixYear;
          let today = date.getDate()+ "-" + "0" + (date.getMonth() + 1)+ "-" + date.getFullYear();

          let prevMonday = new Date();
          let prevMondayDate = new Date(prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7)).toLocaleDateString().trim();

          if (prevMondayDate.split('/')[1].length < 2) {
             this.lastMondayDay = "0" + prevMondayDate.split('/')[1];
          } else {
            this.lastMondayDay = prevMondayDate.split('/')[1];
          }

          if (prevMondayDate.split('/')[0] < 2) {
             this.lastMondayMonth = "0" + prevMondayDate.split('/')[0];
          } else {
            this.lastMondayMonth = prevMondayDate.split('/')[0];
          }

          if (this.lastMondayMonth < 1) {
            this.lastMondayMonth = 11;
          } else {
            this.lastMondayMonth = this.lastMondayMonth - 1;
          }

          if (bitrixMonth < 1) {
            bitrixMonth = 11;
          } else {
            bitrixMonth = bitrixMonth - 1;
          }

          let lastMondayYear = prevMondayDate.split('/')[2];
          let lastMondayFullDate = this.lastMondayDay+"-"+this.lastMondayMonth+"-"+lastMondayYear;

           let BitrixdateNow = new Date(bitrixYear,bitrixMonth,bitrixDay);
          let MondayDateNow = new Date(lastMondayYear,this.lastMondayMonth,this.lastMondayDay);

          if (BitrixdateNow >= MondayDateNow) {

            //  if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.gloria)) {
            //       if (data[index].STATUS_ID === this.$store.state.statusIdD.processed) {
            //         this.weeklyTeleSalesA.push(data[index].STATUS_ID);
            //       }
            //   }


              if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.lina)) {
                if (data[index].STATUS_ID === this.$store.state.statusIdD.processed) {
                  this.weeklyTeleSalesB.push(data[index].STATUS_ID);
                  }
              }
            }            
          }

          this.teleSalesWeeklyDataForDb = {
              value: "weeklyprocessed",
              // gloria: this.weeklyTeleSalesA.length,
              lina: this.weeklyTeleSalesB.length,
          }

          setTimeout(() => {
              this.sendWeeklyDataToDb(this.teleSalesWeeklyDataForDb);
            }, 3000); 
          
      },
        sendWeeklyDataToDb(data) {
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
   getBitrixDataForTheMonthly(data) {
        for (let index in data) {
          let date = new Date()
          let bitrixDay = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[2];
          let bitrixMonth = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[1];
          let bitrixYear = data[index].DATE_MODIFY.substr(0, data[index].DATE_MODIFY.indexOf('T')).split('-')[0];
          let bitrixDate = bitrixDay + "-" + bitrixMonth + "-" + bitrixYear;

          if ((date.getMonth() + 1) < 2) {
             this.month = "0" + (date.getMonth() + 1);
          } else {
            this.month = date.getMonth() + 1;
          }

          if (bitrixMonth == this.month) {

            //  if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.gloria)) {
            //     if (data[index].STATUS_ID === this.$store.state.statusIdD.processed) {
            //       this.monthlyTeleSalesA.push(data[index].STATUS_ID);
            //     }
            //   }

              if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.lina)) {
                  if (data[index].STATUS_ID === this.$store.state.statusIdD.processed) {
                    this.monthlyTeleSalesB.push(data[index].STATUS_ID);
                  }
                }
            }           
          }

           this.teleSalesMonthlyDataForDb = {
              value: "monthlyprocessed",
              // gloria: this.monthlyTeleSalesA.length,
              lina: this.monthlyTeleSalesB.length,
            }

            setTimeout(() => {
              this.sendMonthlyDataToDb(this.teleSalesMonthlyDataForDb);   
            }, 5000);             
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
      getWeeklyIndicatorData(data) {
        for (let index in data) {
          if (data[index].period.trim() === "weekly".trim()) {
            this.chartColor = parseInt(data[index].telesales_processed_lead) + 100;
            telesalesProcessedChart.options.scales.yAxes[0].ticks.max =
            parseInt(data[index].telesales_processed_lead) + 100;
          }
        }
      },
      getWeeklySalesData(data) {
         for (let index in data) {
          if (data[index].staff_name.trim().toLowerCase() === "lina".toLowerCase()) {
            telesalesProcessedChart.data.labels[0] = "LINA";
            telesalesProcessedChart.data.datasets[0].data[0] = parseInt(data[index].processed_lead);
            if (parseInt(data[index].processed_lead) < (this.chartColor - 105)) {
              telesalesProcessedChart.data.datasets[0].backgroundColor[0] = "#bf0006";
            } else if (parseInt(data[index].processed_lead) <= (this.chartColor - 100)) {
              telesalesProcessedChart.data.datasets[0].backgroundColor[0] = "#0b6623";
            } else if (parseInt(data[index].processed_lead) > (this.chartColor - 100)) {
              telesalesProcessedChart.data.datasets[0].backgroundColor[0] = "#4cbb17";
            }
         }

        //  if (data[index].staff_name.trim().toLowerCase() === "gloria".toLowerCase()) {
        //     telesalesProcessedChart.data.labels[1] = "GLORIA";
        //     telesalesProcessedChart.data.datasets[0].data[1] = parseInt(data[index].processed_lead);
        //     if (parseInt(data[index].processed_lead) < (this.chartColor - 105)) {
        //       telesalesProcessedChart.data.datasets[0].backgroundColor[1] = "#bf0006";
        //     } else if (parseInt(data[index].processed_lead) <= (this.chartColor - 100)) {
        //       telesalesProcessedChart.data.datasets[0].backgroundColor[1] = "#0b6623";
        //     } else if (parseInt(data[index].processed_lead) > (this.chartColor - 100)) {
        //       telesalesProcessedChart.data.datasets[0].backgroundColor[1] = "#4cbb17";
        //     }
        //  }
        }
        this.createChart('telesalesprocessed-chart', this.telesalesProcessedChart);
      },
    },
     created() {
      eventBus.$on("leadData", (data) => {
        this.getBitrixDataForTheWeek(data);
      });
      eventBus.$on("weeklyindicatorData", (data) => {
        this.getWeeklyIndicatorData(data);
      });
      eventBus.$on("salesWeeklyData", (data) => {
        this.getWeeklySalesData(data);
      });
    }
  }
</script>
