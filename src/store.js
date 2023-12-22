
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    tresults: [],
    lat: [],
    lon: []
  },
  mutations: {
    setTResults(state, data) {
      state.tresults = data;
    },
    setLon(state, lon ) {
      state.lon = lon;
    },
    setLat(state, lat ) {
      state.lat = lat;
    }
  },
});