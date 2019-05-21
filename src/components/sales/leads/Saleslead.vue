<template>
  <canvas id="saleslead-chart"></canvas>
</template>

<script>
  import { eventBus } from '../../../index';
  import Chart from 'chart.js';
  import salesLeadChart from './saleslead-chart.js';


  export default {
    name: 'Saleslead',
    data() {
      return {
        salesLeadChart: salesLeadChart,
        weeklyTeleAssociateA: [],
        weeklyTeleAssociateB: [],
        weeklyTeleAssociateC: [],
        monthlyTeleAssociateA: [],
        monthlyTeleAssociateB: [],
        monthlyTeleAssociateC: [],
        teleSalesMonthlyDataForDb: {},
        teleSalesWeeklyDataForDb: {},
        month: null,
        lastMonth: null,
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

          // console.log(BitrixdateNow);
          // console.log(MondayDateNow);

          
         if (BitrixdateNow >= MondayDateNow) { 

             if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.richard)) {
               this.weeklyTeleAssociateA.push(data[index].MODIFY_BY_ID);
              }

              if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.jeremiah)) {
                this.weeklyTeleAssociateB.push(data[index].MODIFY_BY_ID);
              }

              // if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.dike)) {               
              //   this.weeklyTeleAssociateC.push(data[index].MODIFY_BY_ID);
              // }
            }                    
          }         

           this.teleSalesWeeklyDataForDb = {
              value: "weeklytotalLeads",
              richard: this.weeklyTeleAssociateA.length,
              jeremiah: this.weeklyTeleAssociateB.length,
              // dike: this.weeklyTeleAssociateC.length,
            } 

            setTimeout(() => {
              this.sendWeeklyDataToDb(this.teleSalesWeeklyDataForDb);
            }, 15000);                      
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

          
          // console.log(bitrixMonth);
          // console.log(this.month);
          // console.log("=======");
        
           if (bitrixMonth == this.month) {        
           
             if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.richard)) {
               this.monthlyTeleAssociateA.push(data[index].MODIFY_BY_ID);
              }

              if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.jeremiah)) {
                this.monthlyTeleAssociateB.push(data[index].MODIFY_BY_ID);
              }

              // if (parseInt(data[index].MODIFY_BY_ID) === parseInt(this.$store.state.staffCode.dike)) {
              //   this.monthlyTeleAssociateC.push(data[index].MODIFY_BY_ID);
              // }
            }      
                    
          }        
          
           this.teleSalesMonthlyDataForDb = {
              value: "monthlytotalLeads",
              richard: this.monthlyTeleAssociateA.length,
              jeremiah: this.monthlyTeleAssociateB.length,
              // dike: this.monthlyTeleAssociateC.length,
            }   

            setTimeout(() => {
              this.sendMonthlyDataToDb(this.teleSalesMonthlyDataForDb);  
            }, 17000);  

                   
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
      getMonthlyIndicatorData(data) {
        for (let index in data) {          
          if (data[index].period.trim() === "monthly".trim()) {
             salesLeadChart.options.scales.yAxes[0].ticks.max = 
            parseInt(data[index].sales_a_number_of_lead);
          }
        }         
      },
      getMonthlySalesData(data) {        
         for (let index in data) {
          if (data[index].staff_name.trim().toLowerCase() === "richard".toLowerCase()) {
            salesLeadChart.data.labels[0] = "RICHARD";
            salesLeadChart.data.datasets[0].data[0] =  parseInt(data[index].number_of_lead);
            if (parseInt(data[index].number_of_lead) < (salesLeadChart.options.scales.yAxes[0].ticks.max - 5)) {
              salesLeadChart.data.datasets[0].backgroundColor[0] = "#bf0006";
            } else if (parseInt(data[index].number_of_lead) <= salesLeadChart.options.scales.yAxes[0].ticks.max) {
              salesLeadChart.data.datasets[0].backgroundColor[0] = "#0b6623";
            } else if (parseInt(data[index].number_of_lead) > salesLeadChart.options.scales.yAxes[0].ticks.max) {
              salesLeadChart.data.datasets[0].backgroundColor[0] = "#4cbb17";
            }          
         }

         if (data[index].staff_name.trim().toLowerCase() === "jeremiah".toLowerCase()) {
            salesLeadChart.data.labels[1] = "JEREMIAH";
            salesLeadChart.data.datasets[0].data[1] = parseInt(data[index].number_of_lead);
            if (parseInt(data[index].number_of_lead) < (salesLeadChart.options.scales.yAxes[0].ticks.max - 5)) {
              salesLeadChart.data.datasets[0].backgroundColor[1] = "#bf0006";
            } else if (parseInt(data[index].number_of_lead) <= salesLeadChart.options.scales.yAxes[0].ticks.max) {
              salesLeadChart.data.datasets[0].backgroundColor[1] = "#0b6623";
            } else if (parseInt(data[index].number_of_lead) > salesLeadChart.options.scales.yAxes[0].ticks.max) {
              salesLeadChart.data.datasets[0].backgroundColor[1] = "#4cbb17";
            }          
         }

        //   if (data[index].staff_name.trim().toLowerCase() === "dike".toLowerCase()) {
        //     salesLeadChart.data.labels[2] = "DIKE";
        //     salesLeadChart.data.datasets[0].data[2] = parseInt(data[index].number_of_lead);
        //     if (parseInt(data[index].number_of_lead) < (salesLeadChart.options.scales.yAxes[0].ticks.max - 5)) {
        //       salesLeadChart.data.datasets[0].backgroundColor[2] = "#bf0006";
        //     } else if (parseInt(data[index].number_of_lead) <= salesLeadChart.options.scales.yAxes[0].ticks.max) {
        //       salesLeadChart.data.datasets[0].backgroundColor[2] = "#0b6623";
        //     } else if (parseInt(data[index].number_of_lead) > salesLeadChart.options.scales.yAxes[0].ticks.max) {
        //       salesLeadChart.data.datasets[0].backgroundColor[2] = "#4cbb17";
        //     }          
        //  }
          }          
          
        this.createChart('saleslead-chart', this.salesLeadChart);
      },
    },
    created() {
      eventBus.$on("leadData", (data) => {       
        this.getBitrixDataForTheWeek(data);        
      });
      eventBus.$on("monthlyindicatorData", (data) => {
        this.getMonthlyIndicatorData(data);
      });   
       eventBus.$on("salesMonthlyData", (data) => {
        this.getMonthlySalesData(data);
      });
    }
  }
</script>
