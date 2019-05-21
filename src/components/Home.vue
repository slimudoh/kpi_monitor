<template>
  <div class="main__box">
      <div v-show="timer === 1">
        <Sales/>
      </div>
      <div v-show="timer === 2">
        <Market/>
      </div>
    <Loader v-if="getData"/>
    <!-- <div class="test" @click="testEmail()">email</div>  -->
  </div>
</template>
<script>
  import Chart from 'chart.js';
  import { eventBus } from '../index';
  import Market from './market/Market';
  import Sales from './sales/Sales';
  import Loader from './Loader';

  export default {
    name: 'Home',
    components: {
      Market,
      Sales,
      Loader
    },
    data() {
      return {
        timer: 1,
        bitrixAuth: null,
        token: null,
        bitrixSalesLeadApi: null,
        bitrixSalesDealApi: null,
        getData: true,
        dataCollected: null,
        checkLeadDataComplete: false,
        checkDealDataComplete: false,
        checkCompanyDataComplete: false,
        leadPage: 0,
        dealPage: 0,
        companyPage: 0,
        leadData: [],
        dealData: [],
        companyData: [],
        bitrixChecker: false,
      }
    },
    methods: {
      displayChart() {
        setInterval(() => {
          if (this.timer === 2) {
            this.timer = 1;
          } else {
            this.timer = this.timer + 1;
          }
        }, 5 * 60 * 1000);
      },
      getBitrixAccessToken() {
        this.$http.get(this.$store.state.Dbase + "api.php")
          .then(response => {
            let data = response.body;
            if (data) {
               this.dataCollected = "Fetching token for Bitrix24 access.";
                eventBus.$emit("dataCollected", this.dataCollected);

                this.bitrixAuth = data.access_token;
                console.log( this.bitrixAuth);
                this.getDailyIndicatorData();
            } else {
              this.dataNotCollected = "Can't access Token from bitrix24, Please contact admin.";
                eventBus.$emit("dataNotCollected", this.dataNotCollected);
              }
          })
          .catch(e => {
            this.dataNotCollected = "Please check the internet, I can't connect to bitrix24.";
             eventBus.$emit("dataNotCollected", this.dataNotCollected);
            this.getBitrixAccessToken();
            }
          );
      },
      getDailyIndicatorData() {
         let db = "dailyindicator";
         this.$http.get(this.$store.state.Dbase + "select.php?db=" + db)
          .then(response => {

            this.dataCollected = "Fetching daily indicators from database.";
             eventBus.$emit("dataCollected", this.dataCollected);

            let data = response.body.data;

            eventBus.$emit("dailyindicatorData", data);
            this.getWeeklyIndicatorData();
          })
          .catch(e => {
            this.dataCollected = "Can't get daily indicators. Retrying..";
             eventBus.$emit("dataCollected", this.dataCollected);
             this.getDailyIndicatorData();
            }
          );
      },
       getWeeklyIndicatorData() {
         let db = "weeklyindicator";
         this.$http.get(this.$store.state.Dbase + "select.php?db=" + db)
          .then(response => {

             this.dataCollected = "Fetching weekly indicators from database.";
             eventBus.$emit("dataCollected", this.dataCollected);

            let data = response.body.data;

            eventBus.$emit("weeklyindicatorData", data);
            this.getMonthlyIndicatorData();

          })
          .catch(e => {
            this.dataCollected = "Can't get weekly indicators. Retrying..";
             eventBus.$emit("dataCollected", this.dataCollected);
             this.getWeeklyIndicatorData();
            }
          );
      },
      getMonthlyIndicatorData() {
         let db = "monthlyindicator";
         this.$http.get(this.$store.state.Dbase + "select.php?db=" + db)
          .then(response => {

             this.dataCollected = "Fetching monthly indicators from database";
             eventBus.$emit("dataCollected", this.dataCollected);

            let data = response.body.data;

            eventBus.$emit("monthlyindicatorData", data);
            this.getWeeklySalesData();

          })
          .catch(e => {
             this.dataCollected = "Can't get monthly indicators. Retrying..";
             eventBus.$emit("dataCollected", this.dataCollected);
             this.getMonthlyIndicatorData();
            }
          );
      },
       getWeeklySalesData() {
         let db = "weeklysales";
         this.$http.get(this.$store.state.Dbase + "select.php?db=" + db)
          .then(response => {

             this.dataCollected = "Fetching weekly Data from database";
             eventBus.$emit("dataCollected", this.dataCollected);

            let data = response.body.data;

            eventBus.$emit("salesWeeklyData", data);
            this.getMonthlySalesData()

            })            
          .catch(e => {
             this.dataCollected = "Can't get weekly data from Database. Retrying..";
             eventBus.$emit("dataCollected", this.dataCollected);
             this.getWeeklySalesData();             
            }
          );
      },
       getMonthlySalesData() {
         let db = "monthlysales";
         this.$http.get(this.$store.state.Dbase + "select.php?db=" + db)
          .then(response => {

             this.dataCollected = "Fetching monthly Data from database";
             eventBus.$emit("dataCollected", this.dataCollected);

            let data = response.body.data;

            eventBus.$emit("salesMonthlyData", data);
            this.getData = false;

            if (this.bitrixChecker !== true) {              
              this.getBitrixLeadData();
              this.bitrixChecker = true;
            }
                   
          })
          .catch(e => {
             this.dataCollected = "Can't get monthly data from database";
             eventBus.$emit("dataCollected", this.dataCollected);
             this.getMonthlySalesData();
            }
          );
      },
      getBitrixLeadData() {
        let lead = "crm.lead.list";
        this.bitrixSalesLeadApi = this.$store.state.bitrixApi + lead + "?auth=" + this.bitrixAuth + "&start=" + this.leadPage;
        this.$http.get(this.bitrixSalesLeadApi)
          .then(response => {

            let data = response.data.result;


             for (let index in data) {
               this.leadData.push(data[index]);
             }

             if (response.data.next !== undefined) {
               this.leadPage = this.leadPage + 50;
               this.getBitrixLeadData();
             } else {
               this.checkLeadDataComplete = true;
             }

             if (this.checkLeadDataComplete  === true) {
               eventBus.$emit("leadData", this.leadData);
               this.getBitrixDealData();
             }
          })
          .catch(e => {
            this.getBitrixLeadData();
            }
          );
      },
      getBitrixDealData() {
        let deal = "crm.deal.list";
        this.bitrixSalesDealApi = this.$store.state.bitrixApi + deal + "?auth=" + this.bitrixAuth + "&start=" + this.dealPage;
        this.$http.get(this.bitrixSalesDealApi)
          .then(response => {
            let data = response.data.result;

             for (let index in data) {
               this.dealData.push(data[index]);
             }

             if (response.data.next !== undefined) {
               this.dealPage = this.dealPage + 50;
               this.getBitrixDealData();
             } else {
               this.checkDealDataComplete = true;
             }

             if (this.checkDealDataComplete  === true) {
               eventBus.$emit("dealData", this.dealData);
               this.getBitrixCompanyData();
             }
          })
          .catch(e => {
            this.getBitrixDealData();
            }
          );
      },
      getBitrixCompanyData() {
        let company = "crm.company.list";
        this.bitrixSalesDealApi = this.$store.state.bitrixApi + company + "?auth=" + this.bitrixAuth + "&start=" + this.companyPage;
        this.$http.get(this.bitrixSalesDealApi)
          .then(response => {
            let data = response.data.result;

             for (let index in data) {
               this.companyData.push(data[index]);
             }

             if (response.data.next !== undefined) {
               this.companyPage = this.companyPage + 50;
               this.getBitrixCompanyData();
             } else {
               this.checkCompanyDataComplete = true;
               setTimeout(() => {
                this.getWeeklySalesData();
              }, 5 * 60 * 1000);
             }

             if (this.checkCompanyDataComplete  === true) {
               eventBus.$emit("companyData", this.companyData);
             }             

          })
          .catch(e => {
            this.getBitrixCompanyData();
            }
          );
      },
      testEmail() {
       this.$http.get(this.$store.state.Dbase + "sendmail.php")
           .then(response => {
             let data = response.body.data;  
           })
           .catch(e => {
             }
           ); 
       },
    },
    mounted() {
      this.getBitrixAccessToken();
      this.displayChart();
    },
  }
</script>
