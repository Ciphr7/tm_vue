<template>
  <section>
    <v-autocomplete
      v-model="localselectedItem2"
      :base-color="baseColor"
      :color="color"
      :no-data-text="noDataText"
      :items="autocompleteItems"
      :loading="loading"
      :search-input.sync="searchInput"
      :min-length="minLength"
      @input="onAutocompleteChange"
      :item-text="itemText"
      :item-value="selectedItem2"
      :label="label"
    ></v-autocomplete>
  </section>
</template>

<script>
export default {
  props: {
    selectedItem2: {
      type: Object,
      default: null,
    },
    baseColor: {
      type: String,
      default: "red",
    },
    color: {
      type: String,
      default: "red",
    },
    noDataText: {
      type: String,
      default: "i.e. 19145",
    },
    minLength: {
      type: Number,
      default: 3,
    },
    itemText: {
      type: String,
      default: "text",
    },
    itemValue: {
      type: String,
      default: "value",
    },
    label: {
      type: String,
      default: "dest",
    },
  },
  data() {
    return {
      autocompleteItems: [],
      loading: false,
      searchInput: "",
      dest: "", // Add this line if dest is used in the template
      localselectedItem2: null,
    };
  },
  watch: {
    selectedItem2(newValue) {
      // Update localselectedItem2 when the prop changes
      this.localselectedItem2 = newValue;
    },
    searchInput(newSearchInput) {
      if (newSearchInput.length >= this.minLength && !this.gpsCheck) {
        this.onAutocompleteChange();
      }
    },
    localselectedItem2(newValue) {
      // Emit an event to notify the parent when localselectedItem2 changes
      this.$emit("update:selectedItem2", newValue);
    },
  },
  methods: {
    onAutocompleteChange: async function (item) {
      // 'item' contains the selected item
      if (item) {
        this.dest = item.text;
      } else {
        this.dest = ""; // Handle the case when no item is selected
      }

      // The rest of your code remains the same
      this.loading = true;

      try {
        const response = await fetch(
          `https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=${this.searchInput}&apikey=bU03MSs2UjZIS21HMG5QSlIxUTB4QT090`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        this.autocompleteItems = data.map((item) => ({
          text: `${item.City}, ${item.State}, ${item.PostalCode}`,
          value: item,
        }));
      } catch (error) {
        console.error("Error fetching autocomplete data", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
