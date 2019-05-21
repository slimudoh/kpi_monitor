<template>
<div class="main__box">
    <div class="another__box__content">
      <div>
        <div>
          <p style="text-align: center;font-size: 2em;">
            Indicators
          </p>

          <table>
            <thead>
              <tr>
                <th>daily kpi key</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Marketing - Number of Leads</td>
                <td>{{ leadNumber }}</td>
              </tr>
               <!-- <tr>
                <td>Service Management - New Active clients</td>
                <td>{{ activeClientA }}</td>
              </tr> -->
              <tr>
                <td>Service Management - Revenue</td>
                <td>{{ revenueA }}</td>
              </tr>              
            </tbody>            
          </table>
        </div>
      </div>

      <div>
        <div>
          <p>Marketing - Number of Leads (Weekly)</p>
          <div>
             <marketLeadData/>
          </div>           
        </div>
      </div>      

      <div>
        <div>
          <p>Service Management - Active clients (Monthly)</p>
          <div>
            <activePie />            
          </div>            
        </div>
      </div>

      <div>
        <div>
            <p>Service Management - Revenue (Monthly in &#8358;) </p>
            <div>
              <revenuePie />    
            </div>        
        </div>
      </div>

    </div>    
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import { eventBus } from '../../index';
  import marketLeadData from './leads/Lead-data';
  import activePie from './active/active-pie-chart';
  import revenuePie from './revenue/revenue-pie-chart';

  export default {
    name: 'Market',
     components: {
      marketLeadData,
      activePie,
      revenuePie
    },
    data() {
      return {
        leadNumber: "Loading",
        activeClientA: "Loading",
        revenueA: "Loading",
        activeClientB: null,
        revenueB: null,
      }
    },   
    methods: {
      getDailyIndicatorData(data) {
        for (let index in data) {          
          if (data[index].period.trim() === "daily".trim()) {
            this.leadNumber = data[index].marketer_a_number_Of_leads;
            this.activeClientA = parseInt(data[index].service_mgr_b_client);
            this.revenueA = "₦" + this.getCurrencyValue(parseInt(data[index].service_mgr_b_revenue)); 
            this.activeClientB = data[index].service_mgr_b_client;
          }
        }  
      },
      getCurrencyValue(data) {
        let money = "" + data;
          if (money.length < 4) {
           return money;
          } else if (money.length === 4) {
            let firstMoney = money.slice(0, 1);
            let secondMoney = firstMoney + "," + money.slice(1);
            return secondMoney;
          } else if (money.length === 5) {
            let firstMoney = money.slice(0, 2);
            let secondMoney = firstMoney + "," + money.slice(2);
            return secondMoney;
          } else if (money.length === 6) {
            let firstMoney = money.slice(0, 3);
            let secondMoney = firstMoney + "," + money.slice(3);
            return secondMoney;
          } else if (money.length === 7) {
            let firstMoney = money.slice(0, 1);
            let secondMoney = money.slice(1, 4);
            let thirdMoney = firstMoney + "," + secondMoney + "," + money.slice(4);
            return thirdMoney;
          } else if (money.length === 8) {
            let firstMoney = money.slice(0, 2);
            let secondMoney = money.slice(2, 5);
            let thirdMoney = firstMoney + "," + secondMoney + "," + money.slice(5);
            return thirdMoney;
          } else if (money.length === 9) {
            let firstMoney = money.slice(0, 3);
            let secondMoney = money.slice(3, 6);
            let thirdMoney = firstMoney + "," + secondMoney + "," + money.slice(6);
            return thirdMoney;
        }
      }
    },
    created() {
     eventBus.$on("dailyindicatorData", (data) => {
        this.getDailyIndicatorData(data);
      });
    }
  }
</script>
