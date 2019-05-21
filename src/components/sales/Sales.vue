<template>
  <div class="main__box">
    <div class="main__box__content">
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>daily kpi key</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Telesales - Processed Leads</td>
                <td>{{ processedLead }}</td>
              </tr>
               <tr>
                <td>Telesales - Assigned Leads</td>
                <td>{{ assignedLead }}</td>
              </tr>
              <tr>
                <td>Sales Associate A - Number of Leads</td>
                <td>{{ leadNumberForA }}</td>
              </tr>              
              <tr>
                <td>Sales Associate B - Number of Leads</td>
                <td>{{ leadNumberForB }}</td>
              </tr>
            </tbody>            
          </table>
        </div>
      </div>      

      <div>
        <div>
          <p>Telesales - Weekly Processed Leads</p>
            <TelesalesProcessed />
        </div>
      </div> 

          <div>
        <div>
          <p>Telesales - Weekly Assigned Leads</p>
            <TelesalesAssigned />
        </div>
      </div>

      <div>
        <div>
            <p>sales associates - Monthly revenue(&#8358;) </p>
            <SalesAssociatePie />            
        </div>
      </div>
      
      <div>
        <div>
          <p> sales associates - Monthly Leads</p>
            <Saleslead />
        </div>
      </div>

      <div>
        <div>
          <p>Sales associates - Monthly sales Revenue(&#8358;)</p>
            <Salespipeline />
        </div>
      </div>      
    </div>    
  </div>
</template>

<script>
  import { eventBus } from '../../index';
  import TelesalesProcessed from './telesales-processed/Telesalesprocessed';
  import TelesalesAssigned from './telesales-assigned/Telesalesassigned';
  import Saleslead from './leads/Saleslead';
  import Salespipeline from './revenue/Salespipeline';
  import SalesAssociatePie from './sales-associate-piechart/Salesassociate-pie-chart';

  export default {
    name: 'Sales',
    components: {
      TelesalesProcessed,
      TelesalesAssigned,
      Saleslead,
      Salespipeline,
      SalesAssociatePie,
    },
    data() {
      return {
         processedLead: "Loading",
        assignedLead: "Loading",
        leadNumberForA: "Loading",
        leadNumberForB: "Loading",
      }     
    },
    methods: {
      getDailyIndicatorData(data) {
        for (let index in data) {          
          if (data[index].period.trim() === "daily".trim()) {
            this.processedLead = data[index].telesales_processed_lead;
            this.assignedLead = data[index].telesales_assigned_lead;
            this.leadNumberForA = data[index].sales_a_number_of_lead;
            this.leadNumberForB = data[index].sales_b_number_of_lead;
          }
        }  
      },
    },
    created() {
     eventBus.$on("dailyindicatorData", (data) => {
        this.getDailyIndicatorData(data);
      });
    }
  }
</script>
