<template>
  <canvas id="salespipeline-chart"></canvas>
</template>

<script>
  import {eventBus} from '../../../index';
  import Chart from 'chart.js';
  import salespipelineChart from './salespipeline-chart.js';

  export default {
    name: 'Salespipeline',
    data() {
      return {
        salespipelineChart: salespipelineChart,
        salesAssociateAPipeline: null,
        salesAssociateAClosed: null,
        salesAssociateBPipeline: null,
        salesAssociateBClosed: null,
        salesAssociateCPipeline: null,
        salesAssociateCClosed: null,
        weeklySalesAssociateAPipeline: null,
        weeklySalesAssociateAClosed: null,
        weeklySalesAssociateBPipeline: null,
        weeklySalesAssociateBClosed: null,
        weeklySalesAssociateCPipeline: null,
        weeklySalesAssociateCClosed: null,
        monthlySalesAssociateAPipeline: null,
        monthlySalesAssociateAClosed: null,
        monthlySalesAssociateBPipeline: null,
        monthlySalesAssociateBClosed: null,
        monthlySalesAssociateCPipeline: null,
        monthlySalesAssociateCClosed: null,
        SalesDataForDb: {},
        weeklySalesDataForDb: {},
        monthlySalesDataForDb: {},
        salesAssociatePipeLineA: {
          value: 0,
        },
        salesAssociatePipeLineB: {
          value: 0,
        },
        salesAssociatePipeLineC: {
          value: 0,
        },
        salesAssociateClosedA: {
          value: 0,
        },
        salesAssociateClosedB: {
          value: 0,
        },
        salesAssociateClosedC: {
          value: 0,
        },
        weeklySalesAssociatePipeLineA: {
          value: 0,
        },
        weeklySalesAssociatePipeLineB: {
          value: 0,
        },
        weeklySalesAssociatePipeLineC: {
          value: 0,
        },
        weeklySalesAssociateClosedA: {
          value: 0,
        },
        weeklySalesAssociateClosedB: {
          value: 0,
        },
        weeklySalesAssociateClosedC: {
          value: 0,
        },
        monthlySalesAssociatePipeLineA: {
          value: 0,
        },
        monthlySalesAssociatePipeLineB: {
          value: 0,
        },
        monthlySalesAssociatePipeLineC: {
          value: 0,
        },
        monthlySalesAssociateClosedA: {
          value: 0,
        },
        monthlySalesAssociateClosedB: {
          value: 0,
        },
        monthlySalesAssociateClosedC: {
          value: 0,
        },
        month: null,
        lastMonth: null,
        upperMonth: null,
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
      getBitrixDataForTheChart(data) {
        this.getBitrixDataForTheWeek(data);
        for (let index in data) {

          let date = new Date()
          let bitrixDay = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[2];
          let bitrixMonth = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[1];
          let bitrixYear = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[0];

          let bitrixDate = bitrixDay + "-" + bitrixMonth + "-" + bitrixYear;

          this.month = "" + (date.getMonth() + 1);

          if (this.month.length < 2) {
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

          if ((this.month - 2) < 10) {
            if (this.month == 2) {
              this.upperMonth = 12;
            } else if (this.month == 1) {
              this.upperMonth = 11;
            } else {
              this.upperMonth = "0" + (this.month - 2);
            }
          } else {
            this.upperMonth = "" + (this.month - 2);
          }

          // console.log(this.month);
          // console.log(bitrixMonth);
          // console.log(this.lastMonth);
          // console.log(this.upperMonth);
          // console.log("---------");

          //uppermonth
          if (bitrixMonth == this.upperMonth) {

            if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.richard)) {
              if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
                this.salesAssociatePipeLineA.value += parseInt(data[index].OPPORTUNITY);
              }

              if (data[index].STAGE_ID.split(':')[1] !== undefined) {
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
                  this.salesAssociatePipeLineA.value += parseInt(data[index].OPPORTUNITY);
                }
              }
            }

            if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.jeremiah)) {

              if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
                this.salesAssociatePipeLineB.value += parseInt(data[index].OPPORTUNITY);
              
              }

              if (data[index].STAGE_ID.split(':')[1] !== undefined) {
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
                  this.salesAssociatePipeLineB.value += parseInt(data[index].OPPORTUNITY);
                
                }

              }
            }

            // if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.dike)) {

            //   if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
            //     this.salesAssociatePipeLineC.value += parseInt(data[index].OPPORTUNITY);
             
            //   }

            //   if (data[index].STAGE_ID.split(':')[1] !== undefined) {
            //     if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
            //       this.salesAssociatePipeLineC.value += parseInt(data[index].OPPORTUNITY);
            //     }

            //   }
            // }

          }

          //////last month
          if (bitrixMonth == this.lastMonth) {
            if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.richard)) {
              if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
                this.salesAssociatePipeLineA.value += parseInt(data[index].OPPORTUNITY);      
              }

              if (data[index].STAGE_ID.split(':')[1] !== undefined) {
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
                  this.salesAssociatePipeLineA.value += parseInt(data[index].OPPORTUNITY);
              
                }
              }
            }

            if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.jeremiah)) {

              if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
                this.salesAssociatePipeLineB.value += parseInt(data[index].OPPORTUNITY);
            
              }
              if (data[index].STAGE_ID.split(':')[1] !== undefined) {
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
                  this.salesAssociatePipeLineB.value += parseInt(data[index].OPPORTUNITY);    
                }

              }
            }

            // if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.dike)) {

            //   if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
            //     this.salesAssociatePipeLineC.value += parseInt(data[index].OPPORTUNITY);
            
            //   }
            //   if (data[index].STAGE_ID.split(':')[1] !== undefined) {
            //     if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
            //       this.salesAssociatePipeLineC.value += parseInt(data[index].OPPORTUNITY);
             
            //     }

            //   }
            // }

          }


          if (bitrixMonth == this.month) {

            // if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.jeremiah)) {
            //     console.log(parseInt(data[index].CREATED_BY_ID));
            //     console.log(parseInt(this.$store.state.staffCode.jeremiah));
            //     console.log(data[index].TITLE);
            //     console.log(data[index].CREATED_BY_ID);
            //     console.log(data[index].DATE_MODIFY);
            //     console.log(data[index].STAGE_ID);
            //     console.log(data[index].OPPORTUNITY);
            //     console.log("------------");   
            //  }

            if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.richard)) {

              if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
                this.salesAssociatePipeLineA.value += parseInt(data[index].OPPORTUNITY);
           
              }

              if (data[index].STAGE_ID === this.$store.state.stageIdD.dealClosed) {
                this.salesAssociateClosedA.value += parseInt(data[index].OPPORTUNITY);             
              }

              if (data[index].STAGE_ID.split(':')[1] !== undefined) {
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
                  this.salesAssociatePipeLineA.value += parseInt(data[index].OPPORTUNITY);
           
                }

                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.dealClosed) {
                  this.salesAssociateClosedA.value += parseInt(data[index].OPPORTUNITY);
             
                }
              }

            }

            if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.jeremiah)) {

              if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
                this.salesAssociatePipeLineB.value += parseInt(data[index].OPPORTUNITY);
            
              }
              if (data[index].STAGE_ID === this.$store.state.stageIdD.dealClosed) {
                this.salesAssociateClosedB.value += parseInt(data[index].OPPORTUNITY);
            
              }
              if (data[index].STAGE_ID.split(':')[1] !== undefined) {
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
                  this.salesAssociatePipeLineB.value += parseInt(data[index].OPPORTUNITY);
                
                }
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.dealClosed) {
                  this.salesAssociateClosedB.value += parseInt(data[index].OPPORTUNITY);
              
                }
              }

            }

            // if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.dike)) {

            //   if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
            //     this.salesAssociatePipeLineC.value += parseInt(data[index].OPPORTUNITY);
            //   }
            //   if (data[index].STAGE_ID === this.$store.state.stageIdD.dealClosed) {
            //     this.salesAssociateClosedC.value += parseInt(data[index].OPPORTUNITY);
                
            //   }
            //   if (data[index].STAGE_ID.split(':')[1] !== undefined) {
            //     if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
            //       this.salesAssociatePipeLineC.value += parseInt(data[index].OPPORTUNITY);
                
            //     }
            //     if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.dealClosed) {
            //       this.salesAssociateClosedC.value += parseInt(data[index].OPPORTUNITY);                
            //     }
            //   }

            // }
          }
        }

        this.SalesDataForDb = {
          value: "monthlypipeline",
          richardPipeline: "" + this.salesAssociatePipeLineA.value,
          jeremiahPipeline: "" + this.salesAssociatePipeLineB.value,
          // dikePipeline: "" + this.salesAssociatePipeLineC.value,
          richardClosed: "" + this.salesAssociateClosedA.value,
          jeremiahClosed: "" + this.salesAssociateClosedB.value,
          // dikeClosed: "" + this.salesAssociateClosedC.value,
        }    
        
        console.log(this.SalesDataForDb);

        // salespipelineChart.options.scales.yAxes[0].ticks.max = parseInt(this.salesAssociatePipeLineA.value) + parseInt(this.salesAssociateClosedA.value) + parseInt(this.salesAssociatePipeLineB.value) + parseInt(this.salesAssociateClosedB.value) + parseInt(this.salesAssociatePipeLineC.value) + parseInt(this.salesAssociateClosedC.value) + 5000000;

        setTimeout(() => {
          this.sendMonthlyDataToDb(this.SalesDataForDb);
        }, 13000);
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
      getBitrixDataForTheWeek(data) {
        for (let index in data) {
          let date = new Date();
          let bitrixDay = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[2];
          let bitrixMonth = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[1];
          let bitrixYear = data[index].DATE_CREATE.substr(0, data[index].DATE_CREATE.indexOf('T')).split('-')[0];
          let bitrixDate = bitrixDay + "-" + bitrixMonth + "-" + bitrixYear;
          let today = date.getDate() + "-" + "0" + (date.getMonth() + 1) + "-" + date.getFullYear();

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
          let lastMondayFullDate = this.lastMondayDay + "-" + this.lastMondayMonth + "-" + lastMondayYear;


          let BitrixdateNow = new Date(bitrixYear, bitrixMonth, bitrixDay);
          let MondayDateNow = new Date(lastMondayYear, this.lastMondayMonth, this.lastMondayDay);


          if (BitrixdateNow >= MondayDateNow) {

            // if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.jeremiah)) {
            //   if (data[index].STAGE_ID === this.$store.state.stageIdD.dealClosed) {
            //     console.log(data[index].CREATED_BY_ID);
            //     console.log(data[index].DATE_CREATE);
            //     console.log(data[index].DATE_MODIFY);
            //     console.log(data[index].STAGE_ID);
            //     console.log(data[index].OPPORTUNITY);
            //     console.log("------------");
            //   } 
            //  }

            if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.richard)) {
              if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
                this.weeklySalesAssociatePipeLineA.value += parseInt(data[index].OPPORTUNITY);
              }
              if (data[index].STAGE_ID === this.$store.state.stageIdD.dealClosed) {
                this.weeklySalesAssociateClosedA.value += parseInt(data[index].OPPORTUNITY);
              }

              if (data[index].STAGE_ID.split(':')[1] !== undefined) {
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
                  this.weeklySalesAssociatePipeLineA.value += parseInt(data[index].OPPORTUNITY);
                }

                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.dealClosed) {
                  this.weeklySalesAssociateClosedA.value += parseInt(data[index].OPPORTUNITY);
                }
              }
            }

            if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.jeremiah)) {

              if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
                this.weeklySalesAssociatePipeLineB.value += parseInt(data[index].OPPORTUNITY);
              }
              if (data[index].STAGE_ID === this.$store.state.stageIdD.dealClosed) {
                this.weeklySalesAssociateClosedB.value += parseInt(data[index].OPPORTUNITY);
              }
              if (data[index].STAGE_ID.split(':')[1] !== undefined) {
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
                  this.weeklySalesAssociatePipeLineB.value += parseInt(data[index].OPPORTUNITY);
                }
                if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.dealClosed) {
                  this.weeklySalesAssociateClosedB.value += parseInt(data[index].OPPORTUNITY);
                }
              }
            }

            // if (parseInt(data[index].CREATED_BY_ID) === parseInt(this.$store.state.staffCode.dike)) {

            //   if (data[index].STAGE_ID === this.$store.state.stageIdD.propects || data[index].STAGE_ID === this.$store.state.stageIdD.qualified || data[index].STAGE_ID === this.$store.state.stageIdD.proposal || data[index].STAGE_ID === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID === this.$store.state.stageIdD.pipeline) {
            //     this.weeklySalesAssociatePipeLineC.value += parseInt(data[index].OPPORTUNITY);
            //   }
            //   if (data[index].STAGE_ID === this.$store.state.stageIdD.dealClosed) {
            //     this.weeklySalesAssociateClosedC.value += parseInt(data[index].OPPORTUNITY);
            //   }
            //   if (data[index].STAGE_ID.split(':')[1] !== undefined) {
            //     if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.propects || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.qualified || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.proposal || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.negotiate || data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.pipeline) {
            //       this.weeklySalesAssociatePipeLineC.value += parseInt(data[index].OPPORTUNITY);
            //     }
            //     if (data[index].STAGE_ID.split(':')[1] === this.$store.state.stageIdD.dealClosed) {
            //       this.weeklySalesAssociateClosedC.value += parseInt(data[index].OPPORTUNITY);
            //     }
            //   }
            // }

          }
        }

        this.weeklySalesDataForDb = {
          value: "weeklypipeline",
          richardPipeline: "" + this.weeklySalesAssociatePipeLineA.value,
          jeremiahPipeline: "" + this.weeklySalesAssociatePipeLineB.value,
          // dikePipeline: "" + this.weeklySalesAssociatePipeLineC.value,
          richardClosed: "" + this.weeklySalesAssociateClosedA.value,
          jeremiahClosed: "" + this.weeklySalesAssociateClosedB.value,
          // dikeClosed: "" + this.weeklySalesAssociateClosedC.value,
        }

        console.log(this.weeklySalesDataForDb);

        setTimeout(() => {
          this.sendWeeklyDataToDb(this.weeklySalesDataForDb);
        }, 11000);
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
       getMonthlySalesData(data) {

        for (let index in data) {

          if (data[index].staff_name.trim().toLowerCase() === "richard".toLowerCase()) {

            this.salesAssociateAPipeline = parseInt(data[index].pipeline);
            this.salesAssociateAClosed = parseInt(data[index].deal_closed);

            salespipelineChart.data.datasets[0].data[0] = this.salesAssociateAPipeline;
            salespipelineChart.data.datasets[0].backgroundColor[0] = "#4cbb17";
            salespipelineChart.data.datasets[1].data[0] = this.salesAssociateAClosed;
            if (this.salesAssociateAClosed < (this.salesAssociateAPipeline - 5)) {
              salespipelineChart.data.datasets[1].backgroundColor[0] = "#bf0006";
            } else if (this.salesAssociateAClosed <= this.salesAssociateAPipeline) {
              salespipelineChart.data.datasets[1].backgroundColor[0] = "#0b6623";
            } else {
              salespipelineChart.data.datasets[1].backgroundColor[0] = "#4cbb17";
            }
          }

          if (data[index].staff_name.trim().toLowerCase() === "jeremiah".toLowerCase()) {

            this.salesAssociateBPipeline = parseInt(data[index].pipeline);
            this.salesAssociateBClosed = parseInt(data[index].deal_closed);

            salespipelineChart.data.datasets[0].data[1] = this.salesAssociateBPipeline;
            salespipelineChart.data.datasets[0].backgroundColor[1] = "#4cbb17";
            salespipelineChart.data.datasets[1].data[1] = this.salesAssociateBClosed;
            if (this.salesAssociateBClosed < (this.salesAssociateBPipeline - 5)) {
              salespipelineChart.data.datasets[1].backgroundColor[1] = "#bf0006";
            } else if (this.salesAssociateBClosed <= this.salesAssociateBPipeline) {
              salespipelineChart.data.datasets[1].backgroundColor[1] = "#0b6623";
            } else {
              salespipelineChart.data.datasets[1].backgroundColor[1] = "#4cbb17";
            }
          }

          // if (data[index].staff_name.trim().toLowerCase() === "dike".toLowerCase()) {

          //   this.salesAssociateCPipeline = parseInt(data[index].pipeline);
          //   this.salesAssociateCClosed = parseInt(data[index].deal_closed);

          //   salespipelineChart.data.datasets[0].data[2] = this.salesAssociateCPipeline;
          //   salespipelineChart.data.datasets[0].backgroundColor[2] = "#4cbb17";
          //   salespipelineChart.data.datasets[1].data[2] = this.salesAssociateCClosed;
          //   if (this.salesAssociateCClosed < (this.salesAssociateCPipeline - 5)) {
          //     salespipelineChart.data.datasets[1].backgroundColor[2] = "#bf0006";
          //   } else if (this.salesAssociateCClosed <= this.salesAssociateCPipeline) {
          //     salespipelineChart.data.datasets[1].backgroundColor[2] = "#0b6623";
          //   } else {
          //     salespipelineChart.data.datasets[1].backgroundColor[2] = "#4cbb17";
          //   }
          // }
        }

         salespipelineChart.options.scales.yAxes[0].ticks.max = parseInt(this.salesAssociateAPipeline) + parseInt(this.salesAssociateAClosed) + parseInt(this.salesAssociateBPipeline) + parseInt(this.salesAssociateBClosed) + 
         5000000;     

        this.createChart('salespipeline-chart', this.salespipelineChart);
      },
    },
    created() {
      eventBus.$on("dealData", (data) => {
        this.getBitrixDataForTheChart(data);
      });
      eventBus.$on("salesMonthlyData", (data) => {
        this.getMonthlySalesData(data);
      });
    }
  }
</script>
