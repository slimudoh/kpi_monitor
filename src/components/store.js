import Vue from "vue";
import Vuex from "vuex";
import VueResource from "vue-resource";

Vue.use(Vuex);
Vue.use(VueResource);

export const store = new Vuex.Store({
  state: {
    refreshToken: {
      appId: "",
      clientSecret: ""
    },
    staffCode: {
      lekan: 1,
      Sodiq: 10,
      deborah: 14,
      bayo: 16,
      judith: 18,
      bolu: 22,
      ope: 24,
      nnamdi: 26,
      abraham: 28,
      ayo: 30,
      jeremiah: 32,
      uwem: 38,
      tochukwu: 40,
      richard: 42,
      tayo: 44,
      yemisi: 46,
      JeremiahApakaye: 50,
      nas: 48,
      gloria: 56,
      lina: 58,
      dike: 70,
      sola: 72
    },
    statusIdD: {
      unassigned: "NEW",
      notInterested: "1",
      processed: "PROCESSED",
      assigned: "IN_PROCESS",
      junked: "JUNK"
    },
    stageIdD: {
      propects: "NEW",
      qualified: "EXECUTING",
      proposal: "FINAL_INVOICE",
      negotiate: "1",
      pipeline: "2",
      dealClosed: "WON"
    },
    bitrixApi: "",
    //dev
    Dbase: ""
    //live
    // Dbase: "",
  }
});
