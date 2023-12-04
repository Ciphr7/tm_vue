<template>
    <div>
      <v-btn class="red--text" @click="runTrip">Run Trip</v-btn>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      runTrip() {
        const origin = { city: "Destin", state: "FL", postalCode: "32540" };
        const destination = { city: "Las Vegas", state: "NV", postalCode: "88901" };
        const tripLegs = [origin, destination];
  
        const tripData = {
          tripLegs,
          routingMethod: "PRACTICAL",
          borderOpen: true,
          avoidTollRoads: false,
          vehicleType: "TRACTOR3AXLETRAILER2AXLE",
          getDrivingDirections: true,
          getMapPoints: true,
          getStateMileage: true,
          getTripSummary: true,
          mpg: 6
        };
  
        axios.post('https://prime.promiles.com/WebAPI/Scripts/PRIME/PRIMEWebAPI.ashx?apikey=Nm1FY1FtQ2ZMeWoySU5oeElyMnY2Zz090', tripData)
          .then(response => {
            // Handle the response here
            console.log(response.data);
          })
          .catch(error => {
            // Handle errors here
            console.error(error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your component styles here */
  </style>
  