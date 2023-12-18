<template>
  <div>
    <v-card >
      <v-container fluid>
        <v-row>
          <v-col cols="10">
            <v-checkbox
              id="SetToCurrentLocation"
              class="py-1"
              v-model="checkbox1"
              :label="`Set Origin to My GPS Location`"
              v-on:change="setOriginToCurrentLocation()"
            ></v-checkbox>
          </v-col>

          <v-col cols="1">
            <v-icon class="py-5"> mdi-access-point </v-icon>
          </v-col>
        </v-row>
      </v-container>
      <v-text-field
        label="Origin"
        :rules="rules"
        hide-details="auto"
        class="px-2"
        v-model="myPos"
        >{myPos}</v-text-field
      >
      <v-text-field class="px-2" label="Destination #Dallas, tx"></v-text-field>
      <v-btn @click="(seemyLoading())" block> Run Trip </v-btn>
      <v-card-text>Trip Options</v-card-text>
      <v-select :items="r_items" filled label="Practical"></v-select>
      <v-checkbox
        pa-5
        v-model="checkbox2"
        :label="`Close Borders`"
      ></v-checkbox>
      <v-checkbox pa-5 v-model="checkbox3" :label="`Avoid Toll`"></v-checkbox>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "runTrip",
  data: () => ({
    origin: string,
    destination: string,
    arr: [],
    PRIMEWebAPI : PRIMEWebAPI,
    
  }),
  methods: {
    
    origin = new PRIMEWebAPI.TripLeg({ city: "Destin", state: "FL", postalCode: "32540" }),
    destination = new PRIMEWebAPI.TripLeg({ city: "Las Vegas", state: "NV", postalCode: "88901" }),
             arr = [],
            arr(origin),
            arr.push(destination),

            trip = new PRIMEWebAPI.Trip(
                {
                    tripLegs: arr,
                    routingMethod: PRIMEWebAPI.RoutingMethods.PRACTICAL,
                    borderOpen: true,
                    avoidTollRoads: false,
                    vehicleType: PRIMEWebAPI.VehicleTypes.TRACTOR3AXLETRAILER2AXLE,
                    getDrivingDirections: true,
                    getMapPoints: true,
                    getStateMileage: true,
                    getTripSummary: true,
                    mpg: 6
                });

            PRIMEWebAPI.runTrip(trip, callback);
  }   
}

</script>