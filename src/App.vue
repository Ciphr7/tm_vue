<template>
  <v-app id="inspire">
    <v-navigation-drawer class="pa-2" right color="secondary" v-model="Drawer1" app>
    <v-list-item >
      <v-list-item-content class="white--text d-flex justify-center">
        <v-img max-height="70" max-width="70" src="./assets/logo.png"></v-img>
        <v-list-item-title class="text-h6 white--text d-flex justify-center">
          Trip Planner
        </v-list-item-title >
        <v-list-item-subtitle class="white--text d-flex justify-center">
          New Trip - Going today?
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="red lighten-1"></v-divider>

    <v-card  class="px-2" elevation="9" >
      <v-checkbox
        pa-5
        v-model="checkbox"
        :label="`Set Origin to My GPS Location`"
      ></v-checkbox>

       <v-text-field
      label="Origin"
      :rules="rules"
      hide-details="auto"
      class="px-2"
    ></v-text-field>
    <v-text-field class="px-2" label="Destination #Dallas, tx"></v-text-field>
      <v-btn block>
        Run Trip
      </v-btn>
      <v-card-text>Trip Options</v-card-text>
      <v-select :items="r_items" filled label="Practical"></v-select>
      <v-checkbox pa-5 v-model="checkbox" :label="`Close Borders`"></v-checkbox>
      <v-checkbox pa-5 v-model="checkbox" :label="`Avoid Toll`"></v-checkbox>
    </v-card>

   
  </v-navigation-drawer>
    
    <v-app-bar class="red lighten-1 white--text  d-flex justify-center " app>
      <v-app-bar-nav-icon @click="Drawer1 = !Drawer1"></v-app-bar-nav-icon>

      <v-toolbar-title>TruckMiles 2021</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <gmaps-map />
    </v-main>
    <Footer />
  </v-app>
</template>
<style>
#input-usage .v-input__prepend-outer,
#input-usage .v-input__append-outer,
#input-usage .v-input__slot,
#input-usage .v-messages {
  border: 1px dashed rgba(201, 5, 5, 0.4);
}
</style>

<script>
import gmapsMap from "./components/map.vue";
import Footer from "./components/footer.vue";


export default {
  components: { gmapsMap, Footer },
  data: () => ({
    
    Drawer1: null,
    r_items: ["practical", "Shortest", "Interstate"],

    right: true,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 20 characters",
    ],
  }),
};
</script>
