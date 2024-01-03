<template>
  <section>
    <v-autocomplete
      v-model="localSelectedItem"
      :base-color="baseColor"
      :color="color"
      :no-data-text="noDataText"
      :items="autocompleteItems"
      :loading="loading"
      :search-input.sync="searchInput"
      :min-length="minLength"
      @input="onAutocompleteChange"
      :item-text="itemText"
      :item-value="itemText ? String(itemText) : null"
      :label="label"
    ></v-autocomplete>
  </section>
</template>

<script>
export default {
  props: {
    selectedItem: {
      type: String,
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
    default: null,
  },
    label: {
      type: String,
      default: "Origin",
    },
  },
  data() {
    return {
      autocompleteItems: [],
      loading: false,
      searchInput:  "",
      origin: "", // Add this line if origin is used in the template
      localSelectedItem: null,
    };
  },
  watch: {
    selectedItem(newValue) {
      // Update localSelectedItem when the prop changes
      this.localSelectedItem = newValue;
    },
    searchInput(newSearchInput) {
    if (newSearchInput && newSearchInput.length >= this.minLength && !this.gpsCheck) {
      this.onAutocompleteChange();
    }
  },
    localSelectedItem(newValue) {
      // Emit an event to notify the parent when localSelectedItem changes
      this.$emit("update:selectedItem", newValue);
    },
  },
  methods: {
    onAutocompleteChange: async function (item) {
      // 'item' contains the selected item
      if (item) {
        this.origin = item.text;
      } else {
        this.origin = ""; // Handle the case when no item is selected
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
