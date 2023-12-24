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

        <v-autocomplete
          v-model="selectedItem2"
          :items="autocompleteItems2"
          :loading="loading"
          :search-input.sync="searchInput2"
          :min-length="3"
          @input="onAutocompleteChange2"
          item-text2="text"
          item-value2="value"
          label="Destination"
        ></v-autocomplete>
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

export default {
  components: {},
  name: "TripDetail",
  mounted() {},
  data: () => ({
    newValue: null,
    origin: "",
    dest: "",
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
  }),
  computed: {
    iconColor() {
      // Calculate the color based on the value of gpsCheck
      return this.gpsCheck ? "red" : "white";
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

    searchInput: function (newSearchInput) {
      if (newSearchInput.length >= 3 && !this.gpsCheck) {
        this.onAutocompleteChange();
      }
    },
    searchInput2: function (newSearchInput2) {
      if (newSearchInput2.length >= 3) {
        this.onAutocompleteChange2();
      }
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
    onAutocompleteChange: async function (item) {
      // 'item' contains the selected item
      if (item) {
        this.origin = item.text;
      } else {
        this.origin = ""; // Handle the case when no item is selected
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
        console.error("Error fetching autocomplete data", error);
      } finally {
        this.loading = false;
      }
    },
    onAutocompleteChange2: async function (item2) {
      // 'item' contains the selected item
      if (item2) {
        this.dest = item2.text2;
      } else {
        this.dest = ""; // Handle the case when no item is selected
      }

      // The rest of your code remains the same
      this.loading = true;
      try {
        const response2 = await fetch(
          `https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=${this.searchInput2}&apikey=bU03MSs2UjZIS21HMG5QSlIxUTB4QT090`
        );

        if (!response2.ok) {
          throw new Error(`HTTP error! Status: ${response2.status}`);
        }

        const data2 = await response2.json();

        this.autocompleteItems2 = data2.map((item2) => ({
          text: `${item2.City}, ${item2.State}, ${item2.PostalCode}`,
          value: item2, // You can customize this based on your data structure
        }));
      } catch (error) {
        console.error("Error fetching autocomplete data", error);
      } finally {
        this.loading = false;
      }
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
