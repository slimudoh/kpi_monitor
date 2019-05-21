<template>
  <div>
    <div class="kpi_bg">
      <Header/>
      <router-view/>
    </div>
  </div>
</template>
<script>
  import Header from './Header.vue';

  export default {
    name: 'app',
    components: {
      Header,
    },
  }
</script>

<style src="normalize.css/normalize.css">
</style>
<style>

 @import url("https://fonts.googleapis.com/css?family=Montserrat");

  * {
    width: 100%;
    box-sizing: border-box;
  }

  .kpi_bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1200px;
    background-color: #ddd;
    overflow: auto;
    font-family: 'Montserrat', sans-serif;
  }

  .side__bar {
    width: 100%;
    height: 60px;
    padding: 10px;
    background-color: #293c92;
    overflow: hidden;
  }

  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(41, 60, 146, 0.9);
    z-index: 99999;
    padding-top: 100px;
  }

  .loader > div {
    width: 100px;
    height: 100px;
    background-color: #fff;
    margin: 100px auto 0 auto;
    border-radius: 60px;
  }

  .loader > p {
    color: white;
    text-align: center;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
  }

  .spinn_logo {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 60px;
    background-color: #fff;
  }

  .ro_logo {
    width: 140px;
    background-color: #fff;
    padding: 5px;
    border-radius: 5px;
    float: left;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinning {
    animation: spin 4s 1s infinite linear
  }

  .company_avatar {
    width: 600px;
    float: right;
    font-size: 2em;
    text-align: right;
    color: #fff;
    padding-top: 5px;
    text-transform: capitalize;
  }

  .company_avatar > a {
    color: #fff;
    text-decoration: none;
  }

  .main__box {
    width: 100%;
  }

  .main__box__content {
    width: 100%;
    padding: 5px;
    overflow: hidden;
  }

  .main__box__content > div {
    width: 33.33333333%;
    /* height: 280px; */
    float: left;
    overflow: hidden;
    padding: 5px;
    text-align: center;
  }

  .main__box__content > div > div > p {
    text-align: right;
    color: #293c92;
    font-size: 1em;
    margin: 5px 0;
    text-transform: capitalize;
  }

   .main__box__content > div > div > span {
    color: #293c92;
    font-size: 1.5em;
    margin: 5px 0;
    font-weight: 600;
    text-transform: uppercase;
  }

  .main__box__content > div > div {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    height: 275px;
  }


  .main__box__content > div > div > table {
    width: 100%;
    border: 1px solid #ccc;
    font-size: 14px;
    border-radius: 5px;
    border-collapse: collapse
  }

   .main__box__content > div > div > table > thead > tr > th {
    width: 50%;
    border: 1px solid #ccc;
    padding: 5px 0;
    text-align: center;
    text-transform: uppercase;
  }

   .main__box__content > div > div > table > tbody > tr > td {
    width: 50%;
    border: 1px solid #ccc;
    padding: 5px 0;
    text-align: center;
  }

   .main__box__content > div > div > div {
    width: 50%;
    margin: 0 auto;
    border: 1px solid red;
  }

  .main__box__left {
    width: 50%;
    padding: 5px;
    float: left;
    overflow: hidden;
  }

  .main__box__right {
    width: 50%;
    float: left;
    overflow: hidden;
  }

  .main__box__left > div {
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px 10px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .main__box__left > div > div {
    text-align: center;
    padding: 6px 0;
    font-size: 20px;
    font-weight: 600;
    color: #000;
    text-transform: uppercase;
  }

  .main__box__left > div > p {
    text-align: center;
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 600;
    color: #293c92;
  }

  .main__box__left > div > span {
    text-align: center;
    font-size: 1em;
    text-transform: uppercase;
    font-weight: 600;
  }

  .main__box__right > div {
    width: 50%;
    padding: 5px;
    float: left;
  }

  .main__box__right > div > div {
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }

  .main__box__right > div > div > p {
    text-align: center;
    color: #000;
    margin: 0;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .main__box__dept {
    width: 50%;
    padding: 5px;
    float: left;
    text-align: center;
  }

  .main__box__dept > div {
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    height: 450px;
  }

  .main__box__top {
    width: 100%;
    padding: 5px;
    float: left;
    text-align: center;
  }

  .main__box__top > div {
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    height: 170px;
  }

  .main__box__home__heading {
    width: 50%;
    padding: 5px;
    float: left;
  }

  .main__box__home__heading > div {
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
  }

  .main__box__home__heading > div > p {
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .main__box__dept > div > p {
    text-align: right;
    font-size: 1em;
    color: #293c92;
  }

  .main__box__dept > div > span {
    font-weight: 600;
    text-transform: uppercase;
  }

  .kpi-keys {
    overflow: hidden;
  }

  .kpi-keys > div {
    width: 33.33333333%;
    float: left;
    text-align: center;
    padding: 0 10px;
  }

  .kpi-keys > div > p {
    font-size: 20px;
    margin: 0;
    text-transform: capitalize;
  }

  .kpi-keys > div > div {
    width: 100%;
    height: 20px;
    margin: 0 auto;
    border-radius: 5px;
  }

  .danger {
    background-color: #bf0006;
  }

  .green {
    background-color: #0b6623;
  }

  .super {
    background-color: #4CBB17;
  }

  .p__index {
    font-size: 9em;
    color: #bf0006;
  }

  .portal_div {
    width: 100%;
    padding: 5px;
  }

  .portal_header {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    font-size: 2em;
    text-transform: capitalize;
    font-weight: 500;
  }

  .portal_nav {
      width: 100%;
      height: 50px;
      max-width: 500px;
      margin: 0 auto;
      padding: 0 10px;
      overflow: hidden;
  }

  .portal_notice {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 10px;
    overflow: hidden;
    text-align: center;
    color: red;
  }

  .portal_nav > div {
      width: 33.333333333%;
      float: left;
      height: 50px;
      text-align: center;
      padding-top: 15px;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #F79613;
      text-transform: uppercase;
      cursor: pointer;
  }

  .portal_selected_btn {
    background-color: #F79613;
  }

  .portal_unselected_btn {
    background-color: transparent;
  }

  .portal_input {
    width:100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 5px;
    overflow: hidden;
  }

  .portal_input > div {
    width: 100%;
    float: left;
    padding: 5px;
  }

  .portal_input > div > div {
    width: 100%;
    padding: 10px;
    overflow: hidden;
    border-radius: 5px;
    background-color: #fff;
    /* min-height: 200px; */
  }

  .portal_input > div > div > p {
    font-size: 1em;
    color: #293c92;
    margin: 0;
    font-weight: 600;
    text-transform: capitalize;
  }

  .portal_input > div > div > div {
    margin-top: 10px;
    overflow: hidden;
  }

  .portal_input_text {
    width: 80%;
    padding-top: 10px;
    font-size: 12px;
    float: left;
  }

  .portal_input_block {
    width: 20%;
    height: 40px;
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #ddd;
    float: right;
  }

    .portal_input_block > input {
      width: 100%;
      height: 40px;
      padding: 5px;
      font-size: 20px;
      background: transparent;
      border: none;
      outline: none;
    }

    .portal_btn {
    width: 100%;
     max-width: 500px;
     margin: 0 auto 50px auto;
     border-radius: 5px;
    padding: 5px 10px;
    }

    .portal_btn > div {
      width: 100%;
      height: 50px;
      background-color: #F79613;
      border-radius: 5px;
      overflow: hidden;
    }

      .portal_btn > div > div {
      width: 100%;
      height: 50px;
      background-color: #F79613;
      border-radius: 5px;
      overflow: hidden;
      text-align: center;
      color: #fff;
      font-size: 20px;
      padding-top: 15px;
      text-transform: uppercase;
      cursor: pointer;
    }

     .portal_btn > div > button {
      width: 100%;
      height: 50px;
      background: transparent;
      border:none;
      outline: none;
      color: #fff;
      font-size: 20px;
      text-transform: uppercase;
      cursor: pointer;
    }

    .login {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      z-index: 1;
    }

     .login > div {
      width: 300px;
      height: 220px;
      background-color: #293c92;
      margin: 100px auto 0 auto;
      border-radius: 5px;
      padding: 20px 10px;
      text-align: center;
      color: #fff;
    }

    .login > div > p {
      font-size: 18px;
      text-transform: uppercase;
      font-weight: 600;
    }

    .login_input {
      width: 100%;
      height: 40px;
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;
    }

     .login_input > input {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      padding: 0 5px;
      background-color: transparent;
    }


    .login_btn {
      width: 100%;
      height: 40px;
      background-color: #F79613;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;
    }

     .login_btn > button {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      color: #fff;
      font-size: 14px;
      text-transform: uppercase;
      background-color: transparent;
      cursor: pointer;
    }

    .login > div > span {
      font-size: 14px;
      color: red;
    }

    .test {
      width: 50px;
      height: 50px;
      background-color: red;
      position: fixed;
      bottom: 10px;
      right: 10px;
      z-index: 9999999;
      border-radius: 60px;
      cursor: pointer;
      overflow: hidden;
    }

    .side_msg {
      position: fixed;
      bottom: 0;
      right: 0;
      width: 500px;
      padding: 10px 5px 20px 5px;
      color: #fff;
      background-color: rgba(0, 0, 0, .5);
    }

.another__box__content {
    width: 100%;
    padding: 5px;
    overflow: hidden;
  }

  .another__box__content > div {
    width: 50%;
    float: left;
    overflow: hidden;
    padding: 5px;
    text-align: center;
  }


  .another__box__content > div > div {
    width: 100%;
    height: 300px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    margin: 0 auto;
    padding: 5px;
  }

  .another__box__content > div > div > div {
    margin: 0 auto;
    width: 70%;
  }

  .another__box__content > div > div > p {
    text-align: right;
    color: #293c92;
    font-size: 1em;
    margin: 5px 0;
    text-transform: capitalize;
  }

   .another__box__content > div > div > span {
    color: #293c92;
    font-size: 1.5em;
    margin: 5px 0;
    font-weight: 600;
    text-transform: uppercase;
  }

  .another__box__content > div > div > table {
    width: 100%;
    border: 1px solid #ccc;
    font-size: 14px;
    border-radius: 5px;
    border-collapse: collapse
  }

   .another__box__content > div > div > table > thead > tr > th {
    width: 20%;
    border: 1px solid #ccc;
    padding: 5px 0;
    text-align: center;
    text-transform: uppercase;
  }

   .another__box__content > div > div > table > tbody > tr > td {
    width: 20%;
    height: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }

  .error_noconnect {
    color: red;
  }


</style>
