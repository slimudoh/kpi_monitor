<template>
  <div class="loader">
    <div class="spinning">
      <img src="static/logo.png" />
    </div>
    <p v-if="displayResult">
      <span v-if="showWait">Wait a minute... </span>
      <span v-if="!showWait">{{ loaderData }}</span> 
    </p>
     <p v-if="!displayResult">
       <span v-if="showWait">Wait a minute...</span>
       <span v-if="!showWait" :style="{color: showColor}">{{ loaderData }}</span> 
    </p>
  </div>
</template>
<script>
import { eventBus } from '../index';

  export default {
    name: 'Loader',
    data() {
      return {
        loaderData: null,
        displayResult: null,
        showWait: true,
        showColor: 'red',
      }
    },
    created() {
      eventBus.$on("dataCollected", (data) => { 
        this.displayResult = true;
        this.showWait = false,
        this.loaderData = data;        
      });
      eventBus.$on("dataNotCollected", (data) => { 
        this.displayResult = false;
        this.showWait = false,
        this.loaderData = data;        
      });
    }
  }
</script>
