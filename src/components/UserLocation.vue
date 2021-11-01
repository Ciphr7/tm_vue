

<template>
  <div>
    <section class="ui two column centered grid">
      <div class="column">
        <form class="ui segment large form">
          <div class="field">
            <div class="ui right icon input large">
              <input
                type="text"
                placeholder="Enter your address"
                v-model="myPos"
                ref="autocomplete"
              />
              <v-btn class="dot circle link icon" @click="locatorButtonPressed"
                >Hello</v-btn
              >
            </div>
          </div>
        </form>
      </div>
    </section>
    <v-card class="mx-1 px-1" elevation="9">
      <v-container fluid>
        <v-row>
          <v-col cols="10">
            <v-checkbox
              id="SetToCurrentLocation"
              class="py-1"
              v-model="checkbox1"
              :label="`Set Origin to My GPS Location`"
            ></v-checkbox>

            <div class="ui checkbox">
              <input type="checkbox" name="example" />
              <label>Make my profile visible</label>
            </div>
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
      <v-btn block> Run Trip </v-btn>
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
  name: "myLoc",
  data: () => ({
    myPos: "Here3",
    r_items: ["practical", "Shortest", "Interstate"],
    value: false,
    right: true,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 20 || "Max 20 characters",
    ],
    checkbox1: false,
    checkbox2: true,
    checkbox3: true,
  }),
  methods: {
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.myPos = position.coords.latitude;
          console.log(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
};
</script>
