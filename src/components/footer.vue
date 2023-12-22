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
      <trip-details />
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
      <trip-results />
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
          <v-btn @click="openDialog">Fuel Prices</v-btn>
        </v-card-text>
        <v-dialog v-model="dialog" max-width="600">
              <v-card>
                <v-card-title>ProMiles Fuel Prices</v-card-title>
                <v-card-text>
                  <!-- Your dialog content goes here -->
                  This is the dialog content.
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

        <v-card-text class="white--text pt-1 d-flex justify-center">
          Powered by ProMiles
        </v-card-text>
        
        <v-divider></v-divider>

        <v-card-text class="white--text d-flex justify-center">
          <strong>TruckMiles -</strong>{{ new Date().getFullYear() }}
        </v-card-text>
      </v-footer>
    </v-card>
  </v-sheet>
</template>

<script>
import TripDetails from "./TripDetails.vue";
import TripResults from "./TripResults.vue";

export default {
  components: { TripResults, TripDetails },
  name: "Footer",
  data: () => ({
    Drawer2: false,
    Drawer1: true,
    r_items: ["practical", "Shortest", "Interstate"],
    dialog: false,
    right: true,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 20 characters",
    ],
    icons: ["mdi-truck", "mdi-map", "mdi-check"],
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>
