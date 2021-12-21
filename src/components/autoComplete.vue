<template>
  <div id="autocomplete">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="lead-form">
            <h1 class="text-center">Fill Out This Form</h1>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Starting Zip"
                  v-model="startingZip"
                />
                <span class="city-span">{{ startingCity }}</span>
                <span class="city-span">{{ startingZip }}</span>
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ending Zip"
                  v-model="endingZip"
                />
                <span class="city-span">{{ endingCity }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button class="btn btn-primary btn-block" id="submit-form">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <!-- end of .lead-form -->
        </div>
        <!-- end of .col-md-6.col-md-offset-3 -->
      </div>
      <!-- end of .row -->
    </div>
    <!-- end of .container -->
  </div>
  <!-- end of #app -->
</template>

<script>
import Vue from 'vue'
import axios from "axios";
const state = Vue.observable({
    locations:[]
})
export default {
  name: "autoComplete",
  components: {},
   get state(){ return state },

  data() {
      return {
    startingZip: '',
    startingCity: '',
    endingZip: "",
    endingCity: "",
    url: "https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=",
    apikey: "&apikey=bU03MSs2UjZIS21HMG5QSlIxUTB4QT090",
  
   } },
  watch: {
    startingZip: function () {
      this.startingCity = "";
      if (this.startingZip.length == 5) {
        this.getLocations();
      }
    },
    endingZip: function () {
      this.endingCity = "";
      if (this.endingZip.length == 3) {
        this.getLocations();
      }
    },
  },

  methods: {
     async getLocations(startingZip){
        try{
            const res = await axios.get(`this.url + ${startingZip} + this.apikey`)
            state.locations = res.data
            console.log(this.state.locations)
            // state.lastPage = res.last_page
            // state.firstPage = res.first_page
            // state.total = res.total
        }catch(error){ /*Notify user of error*/ }
    },
    // lookupStartingZip: function () {
    //   var self = this;
    //   self.startingCity = "Searching...";
    //   axios
    //     .get(self.url + self.startingZip + self.apikey)
    //     .then (this.response.data.map(item =>{
         
    //       return[item.city, item.state]
    //     // },
    //     // self.startingCity = this.item.city + this.item.state,
    //     //   console.log(response.city))) 
    //     // .catch(function () {
    //     //   self.startingCity = "Invalid Zipcode";
    //     // });
        
    //     )
    //     )},
    // lookupEndingZip: function () {
    //   var self = this;
    //   self.endingCity = "Searching...";
    //   axios
    //     .get(self.url + self.endingZip + self.apikey)
    //     .then(function (response) {
    //       self.endingCity = response.data.city + ", " + response.data.state;
    //     })
    //     .catch(function () {
    //       self.endingCity = "Invalid Zipcode";
    //     });
    // },
  },
};
</script> 

 <style>
#auto-complete {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fafafa;
  margin-top: 0px;
}
</style>