<template>
  <canvas id="revenue-pie-chart"></canvas>
</template>

<script>
import { eventBus } from '../../../index';
  import Chart from 'chart.js';
  import revenueChartData from './revenue-chart-data.js';

  export default {
    name: 'revenuePie',
    data() {
      return {
        revenueChartData: revenueChartData,
        indicatorValue: null,
        salesValue: null,
        serviceManagerAValue: null,
        serviceManagerBValue: null,
        weeklyServiceMgrA: {
          value: 0,
        },
        weeklyServiceMgrB: {
          value: 0,
        },
        monthlyServiceMgrA: {
          value: 0,
        },
        monthlyServiceMgrB: {
          value: 0,
        },
        ServiceWeeklyDataForDb: {},
        ServiceMonthlyDataForDb: {},
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
            // this.indicatorValue = parseInt(data[index].service_mgr_a_revenue)  +  parseInt(data[index].service_mgr_b_revenue);
             this.indicatorValue = parseInt(data[index].service_mgr_b_revenue);     
          }     
        }
      },   
      getMonthlySalesData(data) {
        for (let index in data) {
          if (data[index].staff_name.trim().toLowerCase() === "sola".toLowerCase()) {
            this.serviceManagerBValue =   parseInt(data[index].revenue);
          }
        }

        // this.salesValue = this.serviceManagerAValue + this.serviceManagerBValue;
        this.salesValue = this.serviceManagerBValue;
        this.getPercent();
      },
      getPercent() {        
        revenueChartData.data.labels[0] = "Target";
        revenueChartData.data.labels[1] = "Revenue Generated";       

        revenueChartData.data.datasets[0].data[0] = this.indicatorValue;
        if (this.indicatorValue < (this.salesValue - 5)) {
          revenueChartData.data.datasets[0].backgroundColor[0] = "#bf0006";
        } else if (this.indicatorValue < this.salesValue ) {
          revenueChartData.data.datasets[0].backgroundColor[0] = "#0b6623";
        } else {
          revenueChartData.data.datasets[0].backgroundColor[0] = "#4cbb17";
        }

         revenueChartData.data.datasets[0].data[1] = this.salesValue;
        if (this.salesValue < (this.indicatorValue - 5)) {
          revenueChartData.data.datasets[0].backgroundColor[1] = "#bf0006";
        } else if (this.salesValue < this.indicatorValue ) {
          revenueChartData.data.datasets[0].backgroundColor[1] = "#0b6623";
        } else {
          revenueChartData.data.datasets[0].backgroundColor[1] = "#4cbb17";
        }

        this.createChart('revenue-pie-chart', this.revenueChartData);
      },
      getBitrixDataForTheWeek(data) {

        setTimeout(() => {
          this.getBitrixDataForTheMonth(data);
        }, 30000);

       
        for (let index in data) {

          let date = new Date()
          let bitrixDay = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[2];
          let bitrixMonth = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[1];
          let bitrixYear = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[0];
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
              if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.sola)) {
                if (data[index].STATUS_ID === this.$store.state.statusIdD.dealClosed) {
                  this.weeklyServiceMgrB.value += parseInt(data[index].OPPORTUNITY);
                  }
              }
            }           
          }

            this.ServiceWeeklyDataForDb = {
              value: "weeklyrevenue",
              sola: this.weeklyServiceMgrB.value,
            }

             setTimeout(() => {
              this.sendWeeklyDataToDb(this.ServiceWeeklyDataForDb);
            }, 19000); 

            
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
      getBitrixDataForTheMonth(data) {
        for (let index in data) {
          let date = new Date()
          let bitrixDay = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[2];
          let bitrixMonth = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[1];
          let bitrixYear = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[0];
          let bitrixDate = bitrixDay + "-" + bitrixMonth + "-" + bitrixYear;

          if ((date.getMonth() + 1) < 2) {
             this.month = "0" + (date.getMonth() + 1);
          } else {
            this.month = date.getMonth() + 1;
          }

           if (bitrixMonth == this.month) {
              if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.sola)) {
                if (data[index].STATUS_ID === this.$store.state.statusIdD.dealClosed) {
                  this.weeklyServiceMgrB.value += parseInt(data[index].OPPORTUNITY);
                  }
              }
            }           
          }

           this.ServiceMonthlyDataForDb = {
              value: "monthlyrevenue",
              sola: this.monthlyServiceMgrB.value,
            }

            setTimeout(() => {
               this.sendMonthlyDataToDb(this.ServiceMonthlyDataForDb);
            }, 20000); 

           
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
      eventBus.$on("dealData", (data) => {
        this.getBitrixDataForTheWeek(data);
      });
      eventBus.$on("salesMonthlyData", (data) => {
        this.getMonthlySalesData(data);
      });
    }
  }
</script>
