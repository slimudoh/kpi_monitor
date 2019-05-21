<template>
  <canvas id="market-lead-chart"></canvas>
</template>

<script>
import { eventBus } from '../../../index';
  import Chart from 'chart.js';
  import leadChartData from './lead-chart.js';

  export default {
    name: 'marketLeadData',
    data() {
      return {
        leadChartData: leadChartData,
        target: null,
        noOfLeads: null,
        weeklyMarketA: [],
        monthlyMarketA: [],
        weeklyLeads: {},
        monthlyLeads: {},
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
      getWeeklyIndicatorData(data) {
        for (let index in data) {          
          if (data[index].period.trim() === "weekly".trim()) {
            this.target = parseInt(data[index].marketer_a_number_Of_leads);
          }
        }
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
             if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.judith)) {
               this.weeklyMarketA.push(data[index].CREATED_BY_ID)
              } 
            } 
        }
         this.weeklyLeads = {
              value: "weeklyMarketLeads",
              tayo: this.weeklyMarketA.length,
        }

        console.log(this.weeklyLeads);

        setTimeout(() => {
              this.sendWeeklyDataToDb(this.weeklyLeads);  
        }, 22000); 

                      
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
              if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.judith)) {
               this.monthlyMarketA.push(data[index].CREATED_BY_ID)
              } 
            }
          }

          this.monthlyLeads = {
                value: "monthlyMarketLeads",
                tayo: this.monthlyMarketA.length,
          }

           console.log(this.monthlyLeads);

           setTimeout(() => {
               this.sendMonthlyDataToDb(this.monthlyLeads); 
        }, 25000); 

         
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
      getWeeklySalesData(data) {
         leadChartData.data.labels[0] = "Target";
          leadChartData.data.labels[1] = "No. Of Leads";    

         for (let index in data) {
            if (data[index].staff_name.trim().toLowerCase() === "tayo".toLowerCase()) {

                this.noOfLeads = parseInt(data[index].number_of_lead);

               leadChartData.data.datasets[0].data[0] = this.target;
               leadChartData.data.datasets[0].data[1] =  this.noOfLeads;

               if (this.target < (this.noOfLeads - 5)) {
                  leadChartData.data.datasets[0].backgroundColor[0] = "#bf0006";
                } else if (this.target < this.noOfLeads ) {
                  leadChartData.data.datasets[0].backgroundColor[0] = "#0b6623";
                } else {
                  leadChartData.data.datasets[0].backgroundColor[0] = "#4cbb17";
                }         
          
                if (this.noOfLeads < (this.target - 5)) {
                  leadChartData.data.datasets[0].backgroundColor[1] = "#bf0006";
                } else if (this.noOfLeads < this.target ) {
                  leadChartData.data.datasets[0].backgroundColor[1] = "#0b6623";
                } else {
                  leadChartData.data.datasets[0].backgroundColor[1] = "#4cbb17";
                }
            }
         }
         
         this.createChart('market-lead-chart', this.leadChartData);  

      },
    },
    created() {
       eventBus.$on("weeklyindicatorData", (data) => {
        this.getWeeklyIndicatorData(data); 
      });
       eventBus.$on("leadData", (data) => {       
        this.getBitrixDataForTheWeek(data);        
      });     
      eventBus.$on("salesWeeklyData", (data) => {
        this.getWeeklySalesData(data);
      });
    }
  }
</script>
