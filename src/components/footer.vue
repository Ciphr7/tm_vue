<template>

  <v-footer dark padless class="red lighten-1  ">
    <v-card class=" mx-auto my-3" color="secondary" width="70%">
      <v-card-text class=" d-flex justify-center">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon class=" mx-auto" size="24px" @click="Drawer1 = !Drawer1">
            {{ icon }}
          </v-icon>
        </v-btn>
        <v-icon small @click="Drawer1 = !Drawer1">mdi-home</v-icon>
      </v-card-text>

      <v-card-text class="white--text pt-1 d-flex justify-center">
        Powered by ProMiles
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text d-flex justify-center">
        {{ new Date().getFullYear() }} — <strong>TruckMiles 2021</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>

export default {
  name: "Footer",

  data: () => ({
    icons: ["mdi-truck", "mdi-map", "mdi-check"],
  }),
};
</script>
