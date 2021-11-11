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
              v-on:change="setOriginToCurrentLocation()"
            ></v-switch>
          </v-col>

          <v-col cols="1">
            <v-icon class="py-5"> mdi-access-point </v-icon>
          </v-col>
        </v-row>
      </v-container>
      <autoComplete />
      <v-text-field
        label="Origin"
        :rules="rules"
        hide-details="auto"
        class="px-2"
        v-model="myPos"
        >{myPos}</v-text-field
      >
      <v-text-field class="px-2" label="Destination #Dallas, tx"></v-text-field>
      <v-btn block> Run Trip </v-btn>
      <v-card-text>Trip Options</v-card-text>
      <v-select :items="r_items" filled label="Practical"></v-select>
      <v-switch pa-5 v-model="checkbox2" :label="`Close Borders`"></v-switch>
      <v-switch
        class="p-0 m-0"
        v-model="checkbox3"
        :label="`Avoid Toll`"
      ></v-switch>
    </v-card>
  </div>
</template>

<script>
import autoComplete from "./autoComplete.vue"
export default {
   components: {autoComplete },
  name: "myLoc", 
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
  }),
  methods: {
    setOriginToCurrentLocation() {
      const b = this.checkbox1 == true;
      var self = this;

      if (!b) {
        self.myPos = "";
      } else if (navigator.geolocation) {
        var options = {
          maximumAge: 0,
          timeout: 30000,
          enableHighAccuracy: true,
        };
        navigator.geolocation.getCurrentPosition(success, error, [options]);
      } else {
        alert("User did not allow access to GPS location");
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      function success(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        self.myPos = lat + ":" + lon;
      }
      /* When document is loaded fully...
       ****************************************/
    },
  },
};
</script>
