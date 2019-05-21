<template>
  <div class="main__box">
    <div class="login" v-if="open">
      <div>
        <p>
          performance indicator
        </p>
        <form>
          <div class="login_input">
            <input type="password" placeholder="*********" v-model="login">
          </div>
          <div class="login_btn">
            <button @click.prevent="verify">
              verify
              </button>
          </div>
        </form>
        <span v-if="wrong">
          WRONG!!
        </span>
      </div>
    </div>
    <div class="portal_div">
      <div class="portal_header">
        {{ period }} performance indicator
      </div>

      <div class="portal_nav">
        <div @click="openDaily()" :class="periodToDisplay === 1 ? 'portal_selected_btn':'portal_unselected_btn'">
          DAILy
        </div>
        <div @click="openWeekly()"  :class="periodToDisplay === 2 ? 'portal_selected_btn':'portal_unselected_btn'">
          weekly
        </div>
        <div @click="openMonthly()"  :class="periodToDisplay === 3 ? 'portal_selected_btn':'portal_unselected_btn'">
          monthly
        </div>
      </div>

      <div class="portal_notice" v-if="fetchOldData">
        <p>Hold on..fetching old data</p>
      </div>
      <div class="portal_notice" v-if="errorGettingOldData">
        <p>Error fetching data.. Enter new data and send</p>
      </div>

      <div class="portal_div_container" v-show="periodToDisplay === 1">
      <form>
        <div class="portal_input">
        <div>
          <div>
            <p>
              Telesales
            </p>
            <div>
              <div class="portal_input_text">
                Number of processed leads
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailyProcessedLeads">
              </div>
            </div>
            <div>
              <div class="portal_input_text">
                Number of assigned leads
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailyAssignedLeads">
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>
              Sales Associate A
            </p>
            <div>
              <div class="portal_input_text">
                Number of leads
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailySalesAssociateALeads">
              </div>
            </div>
             <div>
              <div class="portal_input_text">
                Revenue Target
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailySalesAssociateATarget">
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p>
              Sales Associate B
            </p>
            <div>
              <div class="portal_input_text">
                Number of leads
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailySalesAssociateBLeads">
              </div>
            </div>
             <div>
              <div class="portal_input_text">
                Revenue Target
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailySalesAssociateBTarget">
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p>
              Sales Associate C
            </p>
            <div>
              <div class="portal_input_text">
                Number of leads
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailySalesAssociateCLeads">
              </div>
            </div>
             <div>
              <div class="portal_input_text">
                Revenue Target
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailySalesAssociateCTarget">
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p>
              Marketer A
            </p>
            <div>
              <div class="portal_input_text">
                Number of leads
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailyMarketerALeads">
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p>
              Service Manager A
            </p>
            <div>
              <div class="portal_input_text">
                Average revenue
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailyServiceManagerARevenue">
              </div>
            </div>
             <!-- <div>
              <div class="portal_input_text">
                Active clients
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailyServiceManagerAClients">
              </div>
            </div> -->
          </div>
        </div>

         <div>
          <div>
            <p>
              Service Manager B
            </p>
            <div>
              <div class="portal_input_text">
                Average revenue
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailyServiceManagerBRevenue">
              </div>
            </div>
             <!-- <div>
              <div class="portal_input_text">
                Active clients
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.dailyServiceManagerBClients">
              </div>
            </div> -->
          </div>
        </div>

        </div>
        <div class="portal_btn">
          <div>
            <button @click.prevent="sendDailyKpiData" v-show="!sendDaily">
              submit daily data
            </button>
            <div v-show="sendDaily">
              sending data
            </div>
          </div>
        </div>
      </form>
      </div>
      <div v-show="periodToDisplay === 2">
        <form>
          <div class="portal_input">
          <div>
            <div>
              <p>
                Telesales
              </p>
              <div>
                <div class="portal_input_text">
                  Number of processed leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.weeklyProcessedLeads">
                </div>
              </div>
              <div>
                <div class="portal_input_text">
                  Number of assigned leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.weeklyAssignedLeads">
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p>
                Sales Associate A
              </p>
              <div>
                <div class="portal_input_text">
                  Number of leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.weeklySalesAssociateALeads">
                </div>
              </div>
               <div>
                <div class="portal_input_text">
                  Revenue Target
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.weeklySalesAssociateATarget">
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <p>
                Sales Associate B
              </p>
              <div>
                <div class="portal_input_text">
                  Number of leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.weeklySalesAssociateBLeads">
                </div>
              </div>
               <div>
                <div class="portal_input_text">
                  Revenue Target
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.weeklySalesAssociateBTarget">
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <p>
                Sales Associate C
              </p>
              <div>
                <div class="portal_input_text">
                  Number of leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.weeklySalesAssociateCLeads">
                </div>
              </div>
               <div>
                <div class="portal_input_text">
                  Revenue Target
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.weeklySalesAssociateCTarget">
                </div>
              </div>
            </div>
          </div>

           <div>
          <div>
            <p>
              Marketer A
            </p>
            <div>
              <div class="portal_input_text">
                Number of leads
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.weeklyMarketerALeads">
              </div>
            </div>
          </div>
        </div>

          <div>
          <div>
            <p>
              Service Manager A
            </p>
            <div>
              <div class="portal_input_text">
                Average revenue
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.weeklyServiceManagerARevenue">
              </div>
            </div>
             <!-- <div>
              <div class="portal_input_text">
                Revenue Target
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.weeklyServiceManagerAClients">
              </div>
            </div> -->
          </div>
        </div>

        <div>
          <div>
            <p>
              Service Manager B
            </p>
            <div>
              <div class="portal_input_text">
                Average revenue
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.weeklyServiceManagerBRevenue">
              </div>
            </div>
             <!-- <div>
              <div class="portal_input_text">
                Active clients
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.weeklyServiceManagerBClients">
              </div>
            </div> -->
          </div>
        </div>


          </div>

          
          <div class="portal_btn">
            <div>
              <button @click.prevent="sendWeeklyKpiData" v-show="!sendWeekly">
                submit weekly data
              </button>
              <div v-show="sendWeekly">
              sending data
            </div>
            </div>
          </div>
        </form>
      </div>
      <div v-show="periodToDisplay === 3">
        <form>
          <div class="portal_input">
          <div>
            <div>
              <p>
                Telesales
              </p>
              <div>
                <div class="portal_input_text">
                  Number of processed leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.monthlyProcessedLeads">
                </div>
              </div>
              <div>
                <div class="portal_input_text">
                  Number of assigned leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.monthlyAssignedLeads">
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p>
                Sales Associate A
              </p>
              <div>
                <div class="portal_input_text">
                  Number of leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.monthlySalesAssociateALeads">
                </div>
              </div>
               <div>
                <div class="portal_input_text">
                  Revenue Target
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.monthlySalesAssociateATarget">
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <p>
                Sales Associate B
              </p>
              <div>
                <div class="portal_input_text">
                  Number of leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.monthlySalesAssociateBLeads">
                </div>
              </div>
               <div>
                <div class="portal_input_text">
                  Revenue Target
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.monthlySalesAssociateBTarget">
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <p>
                Sales Associate C
              </p>
              <div>
                <div class="portal_input_text">
                  Number of leads
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.monthlySalesAssociateCLeads">
                </div>
              </div>
               <div>
                <div class="portal_input_text">
                  Revenue Target
                </div>
                <div class="portal_input_block">
                  <input type="text" v-model="kpiData.monthlySalesAssociateCTarget">
                </div>
              </div>
            </div>
          </div>

           <div>
          <div>
            <p>
              Marketer A
            </p>
            <div>
              <div class="portal_input_text">
                Number of leads
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.monthlyMarketerALeads">
              </div>
            </div>
          </div>
        </div>

         <div>
          <div>
            <p>
              Service Manager A
            </p>
            <div>
              <div class="portal_input_text">
                Average revenue
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.monthlyServiceManagerARevenue">
              </div>
            </div>
             <!-- <div>
              <div class="portal_input_text">
                Active clients
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.monthlyServiceManagerAClients">
              </div>
            </div> -->
          </div>
        </div>

        <div>
          <div>
            <p>
              Service Manager B
            </p>
            <div>
              <div class="portal_input_text">
                Average revenue
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.monthlyServiceManagerBRevenue">
              </div>
            </div>
             <!-- <div>
              <div class="portal_input_text">
                Active clients
              </div>
              <div class="portal_input_block">
                <input type="text" v-model="kpiData.monthlyServiceManagerBClients">
              </div>
            </div> -->
          </div>
        </div>

          </div>
          <div class="portal_btn">
            <div>
              <button @click.prevent="sendMonthlyKpiData"  v-show="!sendMonthly">
                submit monthly data
              </button>
              <div v-show="sendMonthly">
              sending data
            </div>
            </div>
          </div>
        </form>
      </div>

    </div>

  </div>
</template>
<script>
  import { eventBus } from '../index';
  export default {
    name: 'Portal',
    data() {
      return {
        login: '',
        open: true,
        wrong: false,
        period: "daily",
        periodToDisplay: 1,
        sendDaily: false,
        sendWeekly: false,
        sendMonthly: false,
        fetchOldData: true,
        errorGettingOldData: false,
        kpiData: {
          dailyProcessedLeads: "",
          dailyAssignedLeads: "",
          dailySalesAssociateALeads: "",
          dailySalesAssociateATarget: "",
          dailySalesAssociateBLeads: "",
          dailySalesAssociateBTarget: "",
          dailySalesAssociateCLeads: "",
          dailySalesAssociateCTarget: "",
          dailyMarketerALeads: "",
          dailyServiceManagerARevenue: "",
          dailyServiceManagerBRevenue: "",
          
          weeklyProcessedLeads: "",
          weeklyAssignedLeads: "",
          weeklySalesAssociateALeads: "",
          weeklySalesAssociateATarget: "",
          weeklySalesAssociateBLeads: "",
          weeklySalesAssociateBTarget: "",
          weeklySalesAssociateCLeads: "",
          weeklySalesAssociateCTarget: "",
          weeklyMarketerALeads: "",
          weeklyServiceManagerARevenue: "",
          weeklyServiceManagerBRevenue: "",

          monthlyProcessedLeads: "",
          monthlyAssignedLeads: "",
          monthlySalesAssociateALeads: "",
          monthlySalesAssociateATarget: "",
          monthlySalesAssociateBLeads: "",
          monthlySalesAssociateBTarget: "",
          monthlySalesAssociateCLeads: "",
          monthlySalesAssociateCTarget: "",
          monthlyMarketerALeads: "",
          monthlyServiceManagerARevenue: "",
          monthlyServiceManagerBRevenue: "",
        },
        dailyData: {},
        weeklyData: {},
        monthlyData: {},
      }
    },
    methods: {
      verify() {
        if (this.login.trim().toLowerCase() === "1234") {
          this.open = false;
          this.login = "";
        } else {
          this.wrong = true;
          this.login = "";
        }
      },
      openDaily() {
        this.period = "daily";
        this.periodToDisplay = 1;
      },
      openWeekly() {
        this.period = "weekly";
        this.periodToDisplay = 2;
      },
      openMonthly() {
        this.period = "monthly";
        this.periodToDisplay = 3;
      },
      sendDailyKpiData() {
         let check = confirm("You are about to send new data for the day");
        if (check === true) {
          this.sendDaily = true;
          this.dailyData.period = "daily";
          this.dailyData.dailyProcessedLeads = this.kpiData.dailyProcessedLeads;
          this.dailyData.dailyAssignedLeads =  this.kpiData.dailyAssignedLeads;
          this.dailyData.dailySalesAssociateALeads = this.kpiData.dailySalesAssociateALeads;
          this.dailyData.dailySalesAssociateATarget = this.kpiData.dailySalesAssociateATarget;
          this.dailyData.dailySalesAssociateBLeads = this.kpiData.dailySalesAssociateBLeads;
          this.dailyData.dailySalesAssociateBTarget =  this.kpiData.dailySalesAssociateBTarget;
          this.dailyData.dailySalesAssociateCLeads = this.kpiData.dailySalesAssociateCLeads;
          this.dailyData.dailySalesAssociateCTarget =  this.kpiData.dailySalesAssociateCTarget;
          this.dailyData.dailyMarketerALeads =  this.kpiData.dailyMarketerALeads;
          this.dailyData.dailyServiceManagerARevenue = this.kpiData.dailyServiceManagerARevenue;
          this.dailyData.dailyServiceManagerBRevenue = this.kpiData.dailyServiceManagerBRevenue;

          let body = this.dailyData;
          this.$http.post(this.$store.state.Dbase + "create.php", body)
            .then(response => {
              let data = response.body;
              if (data.status === true) {
                alert("Data sent successfully");
                this.sendDaily = false;
              }
            })
            .catch(e => {
              console.log(e);
              alert("Message not sent. Contact admin for help.")
              this.sendDaily = false;
              }
            );
        }
      },
      sendWeeklyKpiData() {
        let check = confirm("You are about to send new data for the week");
        if (check === true) {
          this.sendWeekly = true;
          this.weeklyData.period = "weekly";
          this.weeklyData.weeklyProcessedLeads = this.kpiData.weeklyProcessedLeads;
          this.weeklyData.weeklyAssignedLeads = this.kpiData.weeklyAssignedLeads;
          this.weeklyData.weeklySalesAssociateALeads = this.kpiData.weeklySalesAssociateALeads;
          this.weeklyData.weeklySalesAssociateATarget = this.kpiData.weeklySalesAssociateATarget;
          this.weeklyData.weeklySalesAssociateBLeads = this.kpiData.weeklySalesAssociateBLeads;
          this.weeklyData.weeklySalesAssociateBTarget = this.kpiData.weeklySalesAssociateBTarget;
          this.weeklyData.weeklySalesAssociateCLeads = this.kpiData.weeklySalesAssociateCLeads;
          this.weeklyData.weeklySalesAssociateCTarget = this.kpiData.weeklySalesAssociateCTarget;
          this.weeklyData.weeklyMarketerALeads = this.kpiData.weeklyMarketerALeads;
          this.weeklyData.weeklyServiceManagerARevenue = this.kpiData.weeklyServiceManagerARevenue;
          this.weeklyData.weeklyServiceManagerBRevenue = this.kpiData.weeklyServiceManagerBRevenue;

          let body = this.weeklyData;
          this.$http.post(this.$store.state.Dbase + "create.php", body)
            .then(response => {
              let data = response.body;
              if (data.status === true) {
                alert("Data sent successfully");
                this.sendWeekly = false;
              }
            })
            .catch(e => {
              console.log(e);
              alert("Message not sent. Contact admin for help.")
              this.sendWeekly = false;
              }
            );
        }
      },
      sendMonthlyKpiData() {
         let check = confirm("You are about to send new data for the month");
        if (check === true) {
          this.sendMonthly = true; 
          this.monthlyData.period = "monthly";
          this.monthlyData.monthlyProcessedLeads = this.kpiData.monthlyProcessedLeads;
          this.monthlyData.monthlyAssignedLeads = this.kpiData.monthlyAssignedLeads;
          this.monthlyData.monthlySalesAssociateALeads = this.kpiData.monthlySalesAssociateALeads;
          this.monthlyData.monthlySalesAssociateATarget = this.kpiData.monthlySalesAssociateATarget;
          this.monthlyData.monthlySalesAssociateBLeads = this.kpiData.monthlySalesAssociateBLeads;
          this.monthlyData.monthlySalesAssociateBTarget = this.kpiData.monthlySalesAssociateBTarget;
          this.monthlyData.monthlySalesAssociateCLeads = this.kpiData.monthlySalesAssociateCLeads;
          this.monthlyData.monthlySalesAssociateCTarget = this.kpiData.monthlySalesAssociateCTarget;
          this.monthlyData.monthlyMarketerALeads = this.kpiData.monthlyMarketerALeads;
          this.monthlyData.monthlyServiceManagerARevenue = this.kpiData.monthlyServiceManagerARevenue;
          this.monthlyData.monthlyServiceManagerBRevenue = this.kpiData.monthlyServiceManagerBRevenue;

          let body = this.monthlyData;
          this.$http.post(this.$store.state.Dbase + "create.php", body)
            .then(response => {
              let data = response.body;
              if (data.status === true) {
                alert("Data sent successfully");
                this.sendMonthly = false; 
              }
            })
            .catch(e => {
              console.log(e);
              alert("Message not sent. Contact admin for help.")
              this.sendMonthly = false;
              }
            );
        }
      },
      getDailyData() {
        let db = "dailyindicator";
         this.$http.get(this.$store.state.Dbase + "select.php?db=" + db)
          .then(response => {
            let data = response.body.data;                       
            this.kpiData.dailyProcessedLeads = data[0].telesales_processed_lead;
            this.kpiData.dailyAssignedLeads = data[0].telesales_assigned_lead;
            this.kpiData.dailySalesAssociateALeads = data[0].sales_a_number_of_lead;
            this.kpiData.dailySalesAssociateATarget = data[0].sales_target_a;
            this.kpiData.dailySalesAssociateBLeads = data[0].sales_b_number_of_lead;
            this.kpiData.dailySalesAssociateBTarget = data[0].sales_target_b;
            this.kpiData.dailySalesAssociateCLeads = data[0].sales_c_number_of_lead;
            this.kpiData.dailySalesAssociateCTarget = data[0].sales_target_c;
            this.kpiData.dailyMarketerALeads = data[0].marketer_a_number_Of_leads;
            this.kpiData.dailyServiceManagerARevenue = data[0].service_mgr_a_revenue;
            this.kpiData.dailyServiceManagerBRevenue = data[0].service_mgr_b_revenue;
            this.getWeeklyData();
          })
          .catch(e => {
            console.log(e);
            this.errorGettingOldData = true;
            this.fetchOldData = false;
            }
          );
      },
      getWeeklyData() {
        let db = "weeklyindicator";
         this.$http.get(this.$store.state.Dbase + "select.php?db=" + db)
          .then(response => {
            let data = response.body.data;
            this.kpiData.weeklyProcessedLeads = data[0].telesales_processed_lead;
            this.kpiData.weeklyAssignedLeads = data[0].telesales_assigned_lead;
            this.kpiData.weeklySalesAssociateALeads = data[0].sales_a_number_of_lead;
            this.kpiData.weeklySalesAssociateATarget = data[0].sales_target_a;
            this.kpiData.weeklySalesAssociateBLeads = data[0].sales_b_number_of_lead;
            this.kpiData.weeklySalesAssociateBTarget = data[0].sales_target_b;
            this.kpiData.weeklySalesAssociateCLeads = data[0].sales_c_number_of_lead;
            this.kpiData.weeklySalesAssociateCTarget = data[0].sales_target_c;
            this.kpiData.weeklyMarketerALeads = data[0].marketer_a_number_Of_leads;
            this.kpiData.weeklyServiceManagerARevenue = data[0].service_mgr_a_revenue;
            this.kpiData.weeklyServiceManagerBRevenue = data[0].service_mgr_b_revenue;
            this.getMonthlyData();
          })
          .catch(e => {
            console.log(e);
            this.errorGettingOldData = true;
             this.fetchOldData = false;
            }
          );          
      },
      getMonthlyData() {
        let db = "monthlyindicator";
         this.$http.get(this.$store.state.Dbase + "select.php?db=" + db)
          .then(response => {
            let data = response.body.data;
            this.kpiData.monthlyProcessedLeads = data[0].telesales_processed_lead;
            this.kpiData.monthlyAssignedLeads = data[0].telesales_assigned_lead;
            this.kpiData.monthlySalesAssociateALeads = data[0].sales_a_number_of_lead;
            this.kpiData.monthlySalesAssociateATarget = data[0].sales_target_a;
            this.kpiData.monthlySalesAssociateBLeads = data[0].sales_b_number_of_lead;
            this.kpiData.monthlySalesAssociateBTarget = data[0].sales_target_b;
            this.kpiData.monthlySalesAssociateCLeads = data[0].sales_c_number_of_lead;
            this.kpiData.monthlySalesAssociateCTarget = data[0].sales_target_c;
            this.kpiData.monthlyMarketerALeads = data[0].marketer_a_number_Of_leads;
            this.kpiData.monthlyServiceManagerARevenue = data[0].service_mgr_a_revenue;
            this.kpiData.monthlyServiceManagerBRevenue = data[0].service_mgr_b_revenue;
            this.fetchOldData = false;
          })
          .catch(e => {
            console.log(e);
            this.errorGettingOldData = true;
             this.fetchOldData = false;
            }
          ); 
      }
    },
    created() {
      this.getDailyData();      
    }
  }
</script>
