<template>
    <div>
      <v-btn class="red--text" @click="testRunTrip">Run Trip</v-btn>
    </div>
  </template>
  
  <script>
  import { tmAPIKey } from './tmAPIKey';
  
  export default {
    methods: {
      testRunTrip() {
      const trip = {
        "TripLegs": [
          {
            "Address": "1900 Texas Avenue",
            "City": "Bridge City",
            "State": "TX",
            "PostalCode": "77611",
            "Latitude": "",
            "Longitude": "",
            "LocationText": ""
          },
          {
            "Address": "",
            "City": "",
            "State": "",
            "PostalCode": "",
            "Latitude": 44.977415,
            "Longitude": -93.264847,
            "LocationText": ""
          }
        ],
        "UnitMPG": 6,
        "RoutingMethod": 0,
        "BorderOpen": true,
        "AvoidTollRoads": false,
        "VehicleType": 7,
        "AllowRelaxRestrictions": true,
        "GetDrivingDirections": true,
        "GetMapPoints": false,
        "GetStateMileage": true,
        "GetTripSummary": true,
        "GetTruckStopsOnRoute": true,
        "GetFuelOptimization": true,
        "apikey": tmAPIKey,
      };

      fetch('http://prime.promiles.com/WebAPI/api/RunTrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip),
      })
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
  },

    }
  </script>
  
  <style scoped>
  /* Your component styles here */
  </style>
  