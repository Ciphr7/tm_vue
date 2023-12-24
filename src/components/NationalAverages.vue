<!-- YourComponent.vue -->

<template>
    <div>
      <h1>API Response:</h1>
      <pre>{{ apiResponse }}</pre>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        apiResponse: null,
      };
    },
    mounted() {
      // Make the request to the local dev server proxy
      this.$axios
        .get('/api/Averages/NationalAverages', {
          params: {
            FuelType: 'DIESEL',
          },
        })
        .then((response) => {
          this.apiResponse = JSON.stringify(response.data, null, 2);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
  };
  </script>
  
  <style scoped>
  /* Add your component styles here */
  </style>
  