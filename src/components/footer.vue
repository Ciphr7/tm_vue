<template>
  <v-sheet dark padless class="blue lighten-1  ">
    <v-navigation-drawer class="pa-2" v-model="Drawer1" app>
      <v-list-item>
        <v-list-item-content class="white--text d-flex justify-center">
          <v-img
            max-height="70"
            max-width="70"
            src="../assets/logo.png"
          ></v-img>
          <v-list-item-title class="text-h6 white--text d-flex justify-center">
            Trip Planner
          </v-list-item-title>
          <v-list-item-subtitle class="white--text d-flex justify-center">
            New Trip - Going today?
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="red lighten-1"></v-divider>
      <myLoc />
      <v-card class="mx-1 px-1" elevation="9">
        <v-container fluid>
        <v-row>
          <v-col  cols="10">
          <v-checkbox
            class ='py-1'
            v-model="checkbox"
            :label="`Set Origin to My GPS Location`"
          ></v-checkbox>
          </v-col>
       
          <v-col cols="1" >
          <v-icon class="py-5" >
            mdi-access-point
          </v-icon>
          </v-col>
        </v-row>
        </v-container>
        <v-text-field
          label="Origin"
          :rules="rules"
          hide-details="auto"
          class="px-2"
        ></v-text-field>
        <v-text-field
          class="px-2"
          label="Destination #Dallas, tx"
        ></v-text-field>
        <v-btn block>
          Run Trip
        </v-btn>
        <v-card-text>Trip Options</v-card-text>
        <v-select :items="r_items" filled label="Practical"></v-select>
        <v-checkbox
          pa-5
          v-model="checkbox"
          :label="`Close Borders`"
        ></v-checkbox>
        <v-checkbox pa-5 v-model="checkbox" :label="`Avoid Toll`"></v-checkbox>
      </v-card>
    </v-navigation-drawer>

    <v-navigation-drawer
      class="pa-2"
      right
      color="secondary"
      v-model="Drawer2"
      app
    >
      <v-list-item>
        <v-list-item-content class="white--text d-flex justify-center">
          <v-img
            max-height="70"
            max-width="70"
            src="../assets/logo.png"
          ></v-img>
          <v-list-item-title class="text-h6 white--text d-flex justify-center">
            Trip Summary
          </v-list-item-title>
          <v-list-item-subtitle class="white--text d-flex justify-center">
            Trip route detailes
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="red lighten-1"></v-divider>

      <v-card class="px-2" elevation="9">
        <v-text-field
          label="input label"
          :rules="rules"
          hide-details="auto"
          class="px-2"
        ></v-text-field>
      </v-card>
    </v-navigation-drawer>
    <v-card class=" mx-auto my-3" color="red" width="70%">
      <v-footer>
        <v-card-text class=" d-flex justify-center">
          <v-btn>
            <v-icon @click="Drawer1 = !Drawer1">
              mdi-home
            </v-icon>
          </v-btn>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon class=" mx-auto" size="24px" @click="Drawer2 = !Drawer2">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-1 d-flex justify-center">
          Powered by ProMiles
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text d-flex justify-center">
          {{ new Date().getFullYear() }} — <strong>TruckMiles 2021</strong>
        </v-card-text>
      </v-footer>
    </v-card>
  </v-sheet>
</template>

<script>
import myLoc from "./UserLocation.vue";
export default {
  components: { myLoc },
  name: "Footer",

  data: () => ({
    Drawer2: false,
    Drawer1: null,

    r_items: ["practical", "Shortest", "Interstate"],

    right: true,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 20 characters",
    ],
    icons: ["mdi-truck", "mdi-map", "mdi-check"],
  }),
};
</script>
