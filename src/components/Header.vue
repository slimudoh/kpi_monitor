<template>
  <div class="side__bar">
    <div class="ro_logo">
      <router-link to="/">
        <img src="static/rologo.png"/>
      </router-link>
    </div>
    <div class="company_avatar">
      <router-link to="/hrportal">
        key performance indicators
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
  }
</script>
