<template>
  <section class="ui two column centered grid">
    <div class="column">
      <form class="ui segment large form">
        <div class="field">
          <div class="ui right icon input large">
            <input
              type="text"
              placeholder="Enter your address"
              v-model="address"
              ref="autocomplete"
            />
            <v-btn class="dot circle link icon" @click="locatorButtonPressed">Hello</v-btn>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
    name: "myLoc",
  data() {
    return {
      address: "",
    };
  },
  methods: {locatorButtonPressed() {
   navigator.geolocation.getCurrentPosition(
      position => {
         console.log(position.coords.latitude);
         console.log(position.coords.longitude);
      },
      error => {
         console.log(error.message);
      },
   )
}
  
}
}
 

</script>
