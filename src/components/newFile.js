/* __placeholder__ */
export default (await import("vue")).defineComponent({
  props: {
    selectedItem: {
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
      default: "Origin",
    },
  },
  name: "Origin",
  data: () => ({
    autocompleteItems: [],
    loading: false,
    searchInput: "",
    selectedItem: null,
  }),
  watch: {
    searchInput: function (newSearchInput) {
      if (newSearchInput.length >= this.minLength && !this.gpsCheck) {
        this.onAutocompleteChange();
      }
    },
  },
  methods: {},
});
