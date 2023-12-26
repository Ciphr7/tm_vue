<v-autocomplete
v-model="selectedItem"
base-color="red"
color = "red"
:items="autocompleteItems"
:loading="loading"
:search-input.sync="searchInput"
:min-length="3"
@input="onAutocompleteChange"
item-text="text"
item-value="value"
label="Origin"
></v-autocomplete>

data: () => ({

    autocompleteItems: [], 
    loading: false,
    searchInput: "",
}),

Methods