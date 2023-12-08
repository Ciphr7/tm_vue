<template>
  <div>
   
    <v-card class="mt-2 mx-1 px-1" elevation="9">
      <v-container fluid>
        <v-row>
          <v-col cols="10">
            <v-switch
              id="SetToCurrentLocation"
              class="py-1"
              color="red"
              v-model="checkbox1"
              :label="`Set Origin to My GPS Location`"
              v-on:change="handleCheckboxChange()"
            ></v-switch>
          </v-col>

          <v-col cols="1">
            <v-icon class="py-5"> mdi-access-point </v-icon>
          </v-col>
        </v-row>
      </v-container>

      <section class="dropdown-wrapper">
      <div @click="isVisible = !isVisible" class="selected-item">
        <span v-if="selectedItem">{{
          selectedItem.City +
          "," +
          selectedItem.State +
          ", " +
          selectedItem.PostalCode
        }}</span>
        <span v-else>Start Location</span>
        <svg
          :class="isVisible ? 'dropdown' : ''"
          class="drop-down-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 8l6 6H6z" />
        </svg>
      </div>

      <div
        :class="isVisible ? 'visible' : 'invisible'"
        class="dropdown-popover"
      >
        <!-- First Input Field -->
        <v-text-field
          label="Origin"
          :rules="rules"
          hide-details="auto"
          class="px-2"
          v-model="myPos"
          type="text"
          placeholder="Search for Location"
        ></v-text-field>

        <!-- Second Input Field -->
        <v-text-field
          label="Destination"
          :rules="rules"
          hide-details="auto"
          class="px-2"
          v-model="destinationPos"
          type="text"
          placeholder="Search for Destination"
        ></v-text-field>

        <br />

        <span v-if="results.length == 0">No Data Available</span>
        <div class="options">
          <ul>
            <li
              @click="selectItem(Location)"
              v-for="(Location, index) in results"
              :key="`City-${index}`"
            >
              {{
                Location.City +
                ", " +
                Location.State +
                ", " +
                Location.PostalCode
              }}
            </li>
          </ul>
        </div>
      </div>
    </section>

      <div class="px-2 my-5">
      
    
      <v-btn block> Run Trip </v-btn>

      <v-card-text>Trip Options</v-card-text>
      <v-select :items="r_items" filled label="Practical"></v-select>
      <v-switch pa-5 v-model="checkbox2" :label="`Close Borders`"></v-switch>
      <v-switch
        class="p-0 m-0"
        v-model="checkbox3"
        :label="`Avoid Toll`"
      ></v-switch>
      </div>
    </v-card>
 </div>
</template>

<script>
//import autoComplete from "./autoComplete.vue"
export default {
  components: {},
  name: "userLoc",
  data: () => ({
    myPos: "",
    r_items: ["practical", "Shortest", "Interstate"],
    value: false,
    right: true,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 20 characters",
    ],
    checkbox1: false,
    checkbox2: true,
    checkbox3: true,
    destinationPos: "",
    startingCity: "",
    endingZip: "",
    endingCity: "",
    url: "https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=",
    apikey: "&apikey=bU03MSs2UjZIS21HMG5QSlIxUTB4QT090",
    results: [],
    selectedItem: null,
    isVisible: false,
    searchQuery: "",
    Location: [],
    timeout: null,
    debounceMilliseconds: 250,
  }),
  watch: {
    checkbox1: function (newValue) {
      if (!newValue) {
        this.setOriginToCurrentLocation();
      }else {
        this.getLocations();
      }
    },
    myPos: function () {
      if (this.myPos.length === 5 && !this.checkbox1) {
        this.getLocations();
      }
    },
    destinationPos: function () {
      // Add any logic related to the destinationPos here
      // You can call getLocations or perform any other necessary actions
      this.getLocations2();
    },
  },
  methods: {
    handleCheckboxChange() {
      if (!this.checkbox1) {
        // Checkbox is checked, set location to current GPS location
        this.myPos=""

      } else {
        
        // Checkbox is unchecked, use user input to set location
        //this.getLocations();

        this.myPos=""
        this.setOriginToCurrentLocation();
      }
    },
    setOriginToCurrentLocation() {
      if (navigator.geolocation) {
        var options = {
          maximumAge: 0,
          timeout: 30000,
          enableHighAccuracy: true,
        };
        navigator.geolocation.getCurrentPosition(
          this.success.bind(this),
          this.error.bind(this),
          [options]
        );
      } else {
        alert("User did not allow access to GPS location");
      }
    },

    success(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      this.myPos = lat + ":" + lon;
      
    },
    

    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },

    async getLocations() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        fetch(this.url + this.myPos + this.apikey)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            this.results = json;
          });
      }, this.debounceMilliseconds);
    },
    async getLocations2() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        fetch(this.url + this.destinationPos + this.apikey)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            this.results = json;
          });
      }, this.debounceMilliseconds);
    },
   
    selectItem(Location) {
      this.selectedItem = Location;
      this.isVisible = false;
    },
    filteredLoctions() {
      return this.userArray.filter((Location) => {
        return Object.values(Location);
      });
    },
  },
};
</script>
<style scoped lang="scss">
#auto-complete {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #be1f1f;
  margin-top: 0px;
}
.form-control {
  background: #2c1515;
}

.dropdown-wrapper {
  max-width: 350px;
  position: absolute;
  margin: 5 auto;
    z-index: 1;

  .selected-item {
    height: 40px;
    border-bottom: 2px solid rgb(228, 61, 61);
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 400;

    .drop-down-icon {
      transform: rotate(0deg);
      transition: all 0.4s ease;
      &.dropdown {
        transform: rotate(180deg);
      }
    }
  }
  .dropdown-popover {
   
    border: 2px solid lightgray;
    top: 46px;
    left: 0;
    right: 0;
    background-color: rgb(185, 39, 39);
    max-width: 100%;
    padding: 10px;
    visibility: hidden;
    transition: all 0.5s ease-in-out;
    max-height: 0px;
    overflow: hidden;
    &.visible {
      max-height: 450px;
      visibility: visible;
    }
  }
  input {
    width: 90%;
    height: 30px;
    border: 2px solid lightgray;
    font-size: 16px;
    padding-left: 8px;
    margin-bottom: 5px;
  }

  .options {
    width: 100%;

    ul {
      list-style: none;
      text-align: left;
      padding-left: 8px;
      max-height: 200px;
      overflow-y: scroll;
      border: 1px solid lightgray;

      li {
        width: 100%;
        border-bottom: 1px solid lightgray;
        padding: 10px;
        background-color: #241313;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          background: #70878a;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
