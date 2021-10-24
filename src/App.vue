<template>
  <v-app id="inspire">
    <v-app-bar class="red lighten-1 white--text  d-flex justify-center " app>
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
 
  }),
};
</script>
