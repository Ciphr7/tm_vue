<template>
  <v-container class="mx-0 px-0">
    <v-row justify="center" align="center" class="mt-5">
      <v-col>
        <v-card class="mx-0 px-0">
          <v-card-title class="headline">Trip Summary</v-card-title>
          <v-card-text>
            <h3>Trip Summary</h3>
            <br />
            <ul>
              <li
                v-for="(leg, index) in $store.state.tresults.TripLegs"
                :key="index"
              >
                <p>{{ leg.LocationText }}<strong></strong></p>
              </li>
            </ul>
            <div>
              <p>
                <strong>Trip Distance:</strong>
                {{ $store.state.tresults.TripDistance }} miles
              </p>
              <p>
                <strong>Trip Minutes:</strong>
                {{ ($store.state.tresults.TripMinutes / 60).toFixed(2) }} hours
              </p>
            </div>

            <h3>Jurisdiction Mileage</h3>
            <ul>
              <li
                v-for="(mileage, index) in $store.state.tresults
                  .JurisdictionMileage"
                :key="index"
              >
                <p>
                  <strong>{{ mileage.State }}:</strong>
                  {{ mileage.TotalMiles }} miles
                </p>
                <p>
                  Toll Miles: {{ mileage.TollMiles }}, Non-Toll Miles:
                  {{ mileage.NonTollMiles }}
                </p>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["tresults"],

  mounted() {
    // Listen for the custom event emitted by the first component
    this.$root.$on("trip-results", this.handleTripResults);
  },

  computed: {},
  watch: {
    tresults(newResults) {
      // This watcher will be triggered whenever tresults changes in the parent
      console.log("tresults changed in parent:", newResults);

      // You can update the child component's data or perform any other actions here
    },
  },
  handleTripResults(tresults) {
    // Now you can use the tresults data in this component
    console.log("Received trip results:", tresults);
    // Update your component's data or perform any other actions
  },
  beforeDestroy() {
    // Don't forget to remove the event listener to avoid memory leaks
    this.$root.$off("trip-results", this.handleTripResults);
  },
};
</script>
