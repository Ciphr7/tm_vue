<template>
  <div>
    <v-card class="mt-2 mx-1 px-1" elevation="9">
      <v-container>
        <v-row>
          <v-col>
            <v-switch
              id="SetToCurrentLocation"
              class="py-1"
              color="red"
              v-model="gpsCheck"
              :label="`Set Origin to My GPS Location`"
            ></v-switch>
          </v-col>

          <v-icon :class="{ 'theme--dark': newValue }" :color="iconColor">
            mdi-access-point
          </v-icon>
        </v-row>

        <template>
          <Origin
            :selectedItem="selectedItem"
            :baseColor="baseColor"
            :color="color"
            :noDataText="noDataText"
            :minLength="minLength"
            :itemText="itemText"
            :item-value="selectedItem ? String(selectedItem.value) : null"
            :label="label"
            @update:selectedItem="updateSelectedItem"
          />

          <Destination
            :selectedItem="selectedItem2"
            :baseColor="baseColor"
            :color="color"
            :noDataText="noDataText2"
            :minLength="minLength"
            :itemText="itemText2"
            :item-value="selectedItem2 ? String(selectedItem2.value) : null"
            :label="label2"
            @update:selectedItem2="updateSelectedItem2"
          />

        </template>
      </v-container>

      <div class="px-1 pb-1">
        <v-card-text class="text-center">Trip Options</v-card-text>
        <v-select
          v-model="selectedRoutingMethod"
          :items="r_items"
          filled
          label="Routing Method"
        ></v-select>
        <v-switch
          v-model="borderCheck"
          :label="`Close Borders`"
          color="red"
        ></v-switch>
        <v-switch
          class="py-1 my-1"
          v-model="tollCheck"
          :label="`Avoid Toll`"
          color="red"
        ></v-switch>

        <v-btn @click="testRunTrip"> Run Trip </v-btn>
        {{ this.tresults.TripDistance }}
      </div>
    </v-card>
  </div>
</template>

<script>
//import autoComplete from "./autoComplete.vue"

import { lookUpKey, tmAPIKey } from "./tmAPIKey";
import Origin from "./Origin.vue";
import Destination from "./Destination.vue";

export default {
  components: { Origin, Destination },
  name: "TripDetail",
  mounted() {},

  data() {
    return {
      selectedOrigin: null,
      selectedDestination: null,
      inputValue: "",
      newValue: null,
      origin: "",
      dest: "",
      baseColor: 'red',
      color: 'red',
      noDataText: 'i.e. 19145',
      noDataText2: 'i.e. Houston, tx',
      minLength: 3,
      itemText: 'text',
      itemText2: 'text2',
      itemValue: { value: null },
      label: 'Origin',
      label2: 'Destination',
      autocompleteItems: [],
      autocompleteItems2: [],
      loading: false,
      searchInput: "",
      searchInput2: "",

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
      url: "https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=",
      apikey: lookUpKey,
      dialog: false,
      results: [],
      results2: [],
      selectedItem: null,
      selectedItem2: null,

      timeout: null,

      tresults: [],
      selectedRoutingMethod: "practical",
    };
  },
  computed: {
    iconColor() {
      // Calculate the color based on the value of gpsCheck
      return this.gpsCheck ? "red" : "white";
    },
    selectedItemValue() {
      return this.selectedOrigin ? this.selectedOrigin.value : null;
    },
    selectedItemValue2() {
      return this.selectedDestination ? this.selectedDstination.value : null;
    },
  },

  watch: {
    gpsCheck: function (newValue) {
      if (newValue) {
        this.$root.$on("lat", this.lat);
        this.$root.$on("lon", this.lon);
        console.log("gpsCheck:", newValue);

        this.setOriginToCurrentLocation();
      } else {
        // Don't forget to remove the event listener to avoid memory leaks
        this.$root.$off("lat", this.lat);
        this.$root.$off("lon", this.lon);
        this.$store.state.lat = "";
        this.$store.state.lon = "";
        this.selectedItem = "";
        this.searchInput = "";

        console.log("nn", this.$store.state.lat, this.$store.state.lon); // Reset the selectedItem when gpsCheck is false
      }

      // Add console logs for debugging
      console.log("lat:", this.$store.state.lat);
      console.log("lon:", this.$store.state.lon);
      console.log("lat:", this.lat);
      console.log("lon:", this.lon);
      console.log("selectedItem:", this.selectedItem);
    },


    selectedRoutingMethod: function (newValue) {
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
  },
  methods: {
    updateSelectedItem(newValue) {
      // Handle the updated selected item from the autocomplete component
      this.selectedItem = newValue;
    },
    updateSelectedItem2(newValue2) {
      // Handle the updated selected item from the autocomplete component
      this.selectedItem2 = newValue2;
    },
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
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
      this.searchInput = this.$store.state.lat + " " + this.$store.state.lon;
    },

    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },

    

    testRunTrip() {
      const trip = {
        TripLegs: [
          {
            Address: "",
            City:  "",
            State:  "",
            PostalCode: "",
            Latitude: this.$store.state.lat,
            Longitude: this.$store.state.lon,
            LocationText: this.selectedItem.text,
          },
          {
            Address: "",
            City: "",
            State: "",
            PostalCode: "",
            Latitude: "",
            Longitude: "",
            LocationText: this.selectedItem2.text,
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
          console.log(this.selectedItem);
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
<style scoped></style>
