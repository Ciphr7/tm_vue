<template>
  <div>
    <v-card class="mt-2 mx-1 px-1" elevation="9">
      <v-container fluid>
        <v-row>
          <v-col cols="10">
            <v-switch
              id="SetToCurrentLocation"
              class="py-1 custom-switch"
              color="red"
              v-model="gpsCheck"
              :label="`Set Origin to My GPS Location`"
            ></v-switch>
          </v-col>

          <v-col cols="1">
            <v-icon :class="{ 'theme--dark': newValue }" :color="iconColor" class=" py-5"> mdi-access-point </v-icon>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-autocomplete
        v-model="selectedItem"
        :items="autocompleteItems"
        :loading="loading"
        :search-input.sync="searchInput"
        :min-length="3"
        @input="onAutocompleteChange"
        item-text="text"
        item-value="value"
        label="Origin"
      ></v-autocomplete>
    </v-container>


      <div class="py-1"></div>
      <section class="dropdown-wrapper2">
        <div @click="isVisible2 = !isVisible2" class="selected-item2">
          <span v-if="selectedItem2">{{
            selectedItem2.City +
              "," +
              selectedItem2.State +
              ", " +
              selectedItem2.PostalCode
          }}</span>
          <span v-else
            ><p class="text-sm-subtitle-2">Destination Location</p></span
          >
          <svg
            :class="isVisible2 ? 'dropdown2' : ''"
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
          :class="isVisible2 ? 'visible2' : 'invisible2'"
          class="dropdown-popover2"
        >
          <!-- First Input Field -->

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

          <span v-if="results2.length == 0">No Data Available</span>
          <div class="options2">
            <ul>
              <li
                @click="selectItem2(Location2)"
                v-for="(Location2, index) in results2"
                :key="`City-${index}`"
              >
                {{
                  Location2.City +
                    ", " +
                    Location2.State +
                    ", " +
                    Location2.PostalCode
                }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div class="px-2 my-2">
        <v-card-text>Trip Options</v-card-text>
        <v-select
          v-model="selectedRoutingMethod"
          :items="r_items"
          filled
          label="Routing Method"
        ></v-select>
        <v-switch
          pa-5
          v-model="borderCheck"
          :label="`Close Borders`"
          color="red"
        ></v-switch>
        <v-switch
          class="py-5 my-2"
          v-model="tollCheck"
          :label="`Avoid Toll`"
          color="red"
        ></v-switch>

        <div>
          <v-btn @click="testRunTrip"> Run Trip </v-btn>
          {{ this.tresults.TripDistance }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
//import autoComplete from "./autoComplete.vue"

import { lookUpKey, tmAPIKey } from "./tmAPIKey";

export default {
  components: {},
  name: "TripDetail",
  mounted() {},
  data: () => ({
    origin: '',
    autocompleteItems: [],
    loading: false,
    searchInput: '',
    myOrg: "",
    r_items: ["practical", "Shortest", "Interstate"],
    value: false,
    right: true,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 20 characters",
    ],
    gpsCheck: false,
    borderCheck: false,
    tollCheck: false,
    destinationPos: "",
    url: "https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=",
    apikey: lookUpKey,

    results: [],
    results2: [],
    selectedItem: null,
    selectedItem2: null,
    isVisible: false,
    isVisible2: false,
    searchQuery: "",
    Location: [],
    Location2: [],
    timeout: null,
    debounceMilliseconds: 250,
    tresults: [],
    selectedRoutingMethod: "practical",
  }),
  computed: {
    iconColor() {
      // Calculate the color based on the value of gpsCheck
      return this.gpsCheck ? 'red' : 'white';
    },
  },
  watch: {
    searchInput: function(newSearchInput) {
      if (newSearchInput.length >= 3) {
        
        this.onAutocompleteChange();
      }
    },
    gpsCheck: function(newValue) {
      if (newValue) {
        this.$root.$on("lat", this.lat);
        this.$root.$on("lon", this.lon);
        this.orgin = "";
        this.setOriginToCurrentLocation();
      } else {
        // Don't forget to remove the event listener to avoid memory leaks
        this.$root.$off("lat", this.lat);
        this.$root.$off("lon", this.lon);
        this.$store.state.lat = "";
        this.$store.state.lon = "";
        this.orgin = "";
        this.onAutocompleteChange();
      }
    },
    selectedRoutingMethod: function(newValue) {
      // You can add any logic here based on the selected value
      switch (newValue) {
        case "practical":
          this.RoutingMethod = 0; // Update with the appropriate value for 'practical'
          break;
        case "Shortest":
          this.RoutingMethod = 1; // Update with the appropriate value for 'Shortest'
          break;
        case "Interstate":
          this.RoutingMethod = 2; // Update with the appropriate value for 'Interstate'
          break;
        // Add more cases if needed
      }
    },
    myOrg: function() {
      if (this.myOrg.length >= 3 && !this.gpsCheck) {
        this.getLocations();
      }
    },
    destinationPos: function() {
      if (this.destinationPos.length >= 3)
        // Add any logic related to the destinationPos here
        // You can call getLocations or perform any other necessary actions
        this.getLocations2();
    },
  },
  methods: {
    onAutocompleteChange: async function (item) {
      // 'item' contains the selected item
      if (item) {
        this.origin = item.text;
      } else {
        this.origin = ''; // Handle the case when no item is selected
      }

      // The rest of your code remains the same
      this.loading = true;

      try {
        const response = await fetch(
          `https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=${this.searchInput}&apikey=bU03MSs2UjZIS21HMG5QSlIxUTB4QT090`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        this.autocompleteItems = data.map((item) => ({
          text: `${item.City}, ${item.State}, ${item.PostalCode}`,
          value: item, // You can customize this based on your data structure
        }));
      } catch (error) {
        console.error('Error fetching autocomplete data', error);
      } finally {
        this.loading = false;
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

      this.$store.commit("setLat", lat);
      this.$emit("lat", this.lat);
      this.$store.commit("setLon", lon);
      this.$emit("lon", this.lon);
      console.log(this.$store.state.lon);
      this.origin = this.$store.state.lat + ":" + this.$store.state.lon;
    },

    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },

    async getLocations() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        fetch(this.url + this.myOrg + this.apikey)
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
            this.results2 = json;
          });
      }, this.debounceMilliseconds);
    },

    selectItem(Location) {
      this.selectedItem = Location;

      this.isVisible = false;
    },
    selectItem2(Location2) {
      this.selectedItem2 = Location2;

      this.isVisible2 = false;
    },
    filteredLoctions() {
      return this.userArray.filter((Location) => {
        return Object.values(Location);
      });
    },
    filteredLoctions2() {
      return this.userArray.filter((Location2) => {
        return Object.values(Location2);
      });
    },
    testRunTrip() {
      const trip = {
        TripLegs: [
          {
            Address:
              this.selectedItem && this.selectedItem.Address
                ? this.selectedItem.Address
                : "",
            City: this.selectedItem ? this.selectedItem.City : "",
            State: this.selectedItem ? this.selectedItem.State : "",
            PostalCode: this.selectedItem ? this.selectedItem.PostalCode : "",
            Latitude: this.$store.state.lat,
            Longitude: this.$store.state.lon,
            LocationText: "",
          },
          {
            Address:
              this.selectedItem2 && this.selectedItem2.Address
                ? this.selectedItem2.Address
                : "",
            City: this.selectedItem2 ? this.selectedItem2.City : "",
            State: this.selectedItem2 ? this.selectedItem2.State : "",
            PostalCode: this.selectedItem2 ? this.selectedItem2.PostalCode : "",
            Latitude: "",
            Longitude: "",
            LocationText: "",
          },
        ],
        UnitMPG: 6,
        RoutingMethod: this.selectedRoutingMethod,
        BorderOpen: this.borderCheck,
        AvoidTollRoads: this.tollCheck,
        VehicleType: 7,
        AllowRelaxRestrictions: false,
        GetDrivingDirections: true,
        GetMapPoints: false,
        GetStateMileage: true,
        GetTripSummary: true,
        GetTruckStopsOnRoute: false,
        GetFuelOptimization: false,
        apikey: tmAPIKey,
      };

      fetch("http://prime.promiles.com/WebAPI/api/RunTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(this.myOrg);
          console.log(JSON.stringify(data));
          this.tresults = data;
          this.$store.commit("setTResults", data);
          this.$emit("trip-results", this.tresults);
          console.log(this.selectedRoutingMethod);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.custom-switch {
  font-size: 20px;
}
.v-label {
  font-size: 10px;
}

.theme--dark.v-icon{
  color: rgb(20, 10, 91);
}

.v-input--selection-controls {
  font-size: 10px;
  height: 10px;
}

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
  max-width: 100%;
  position: relative;
  margin: 5 auto;
  z-index: 3;
  background: #c8c4c4;
  .selected-item {
    height: 40px;
    border-bottom: 2px solid rgb(228, 61, 61);
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
    z-index: 1;
    border: 2px solid rgb(157, 4, 4);
    top: 46px;
    left: 0;
    right: 0;
    color: red;
    max-width: 100%;
    padding: 1px;
    visibility: hidden;
    transition: all 0.5s ease-in-out;
    max-height: 0px;
    overflow: hidden;

    &.visible {
      max-height: 400px;
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
    position: absolute;

    ul {
      list-style: none;
      text-align: left;
      padding-left: 8px;
      max-height: 200px;
      overflow-y: scroll;
      border: 1px solid rgb(63, 15, 15);

      li {
        width: 100%;
        border-bottom: 1px solid lightgray;
        padding: 10px;
        background-color: #d81a1a;
        cursor: pointer;
        color: #fff;
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

#auto-complete2 {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #be1f1f;
  margin-top: 0px;
}
.form-control2 {
  background: #2c1515;
}

.dropdown-wrapper2 {
  max-width: 100%;
  position: relative;
  margin: 5 auto;
  z-index: 1;
  background: #c8c4c4;
  .selected-item2 {
    height: 40px;
    border-bottom: 2px solid rgb(228, 61, 61);
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: 400;

    .drop-down-icon2 {
      transform: rotate(0deg);
      transition: all 0.4s ease;
      &.dropdown2 {
        transform: rotate(180deg);
      }
    }
  }
  .dropdown-popover2 {
    border: 2px solid rgb(157, 4, 4);
    top: 46px;
    left: 0;
    right: 0;
    color: red;
    max-width: 100%;
    padding: 1px;
    visibility: hidden;
    transition: all 0.5s ease-in-out;
    max-height: 0px;
    overflow: hidden;
    &.visible2 {
      max-height: 400px;
      visibility: visible;
    }
  }
  input2 {
    width: 90%;
    height: 30px;
    border: 2px solid lightgray;
    font-size: 16px;
    padding-left: 8px;
    margin-bottom: 5px;
  }

  .options2 {
    width: 100%;

    ul {
      list-style: none;
      text-align: left;
      padding-left: 8px;
      max-height: 200px;
      overflow-y: scroll;
      border: 1px solid rgb(63, 15, 15);

      li {
        width: 100%;
        border-bottom: 1px solid lightgray;
        padding: 10px;
        background-color: #d81a1a;
        cursor: pointer;
        color: #fff;
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
