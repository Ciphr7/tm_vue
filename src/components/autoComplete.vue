<template>
  <div id="autoComplete">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="lead-form">
            <h4 class="text-center">Fill Out This Form</h4>
         

            <div class="row">
              <div class="col-md-6">
              

                <section class="dropdown-wrapper">
                  <div @click="isVisible = !isVisible" class="selected-item">
                    <span v-if="selectedItem">{{selectedItem.City +","+ selectedItem.State + ", " + selectedItem.PostalCode}}</span>
                    <span v-else>Start Location</span>
                    <svg
                      :class="isVisible ? 'dropdown' : ''"
                      class="drop-down-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 8l6 6H6z" />
                    </svg>
                  </div>

                  <div
                    :class="isVisible ? 'visible' : 'invisible'"
                    class="dropdown-popover"
                  >
                    <input
                    
                      v-model="startingZip"
                      type="text"
                      placeholder="Search for Location"
                      
                    />

                    <br />
                    
                    <span v-if="results.length == 0">No Data Available</span>
                    <div class="options">
                      <ul>
                        <li
                          @click="selectItem(Location)"
                          v-for="(Location, index) in results"
                          :key="`City-${index}`"
                        >
                          {{ Location.City + ", " + Location.State + ", " + Location.PostalCode  }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

              

            
                <!-- <span class="city-span">{{ this.results}}</span> -->
                <!-- <ul>
                  <li let item of (results | async)></li>
                </ul> -->
              <hr />
              </div>

            </div>
           
            <!-- <div class="row">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ending Zip"
                  v-model="endingZip"
                />
                <span class="city-span">{{ endingCity }}</span>
              </div>
            </div> -->
           
          </div>
          <!-- end of .lead-form -->
        </div>
        <!-- end of .col-md-6.col-md-offset-3 -->
      </div>
      <!-- end of .row -->
    </div>
    <!-- end of .container -->
  </div>
  <!-- end of #app -->
</template>

<script>
export default {
  name: "autoComplete",
  components: {},

  data() {
    return {
      startingZip: "",
      startingCity: "",
      endingZip: "",
      endingCity: "",
      url: "https://prime.promiles.com/WebAPI/api/ValidateLocation?locationText=",
      apikey: "&apikey=bU03MSs2UjZIS21HMG5QSlIxUTB4QT090",
      results: [],
      selectedItem: null,
      isVisible: false,
      searchQuery: "",
      Location:[],
      timeout: null,
      debounceMilliseconds: 250,
    };
  },
  watch: {
    startingZip: function () {
    
      if (this.startingZip.length == 5) {
        this.getLocations();
      }
    },
  },
  computed: {
    
  },

  methods: {
    async getLocations() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
      fetch(this.url + this.startingZip + this.apikey)
      
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.results = json;
        });
    },
 this.debounceMilliseconds);
    },
    selectItem(Location) {
      this.selectedItem = Location;
      this.isVisible = false;
    },
    filteredLoctions() {
      return this.userArray.filter((Location) => {
        return Object.values(Location);
      });
    },

  },
};
</script> 

 <style scoped lang="scss">
#auto-complete {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
  color: #be1f1f;
  margin-top: 0px;
}
.form-control {
  background: #2c1515;
}

.dropdown-wrapper {
  max-width: 350px;
  position: absolute;
  margin: 5 auto;
    z-index: 1;

  .selected-item {
    height: 40px;
    border-bottom: 2px solid rgb(228, 61, 61);
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 400;

    .drop-down-icon {
      transform: rotate(0deg);
      transition: all 0.4s ease;
      &.dropdown {
        transform: rotate(180deg);
      }
    }
  }
  .dropdown-popover {
   
    border: 2px solid lightgray;
    top: 46px;
    left: 0;
    right: 0;
    background-color: rgb(185, 39, 39);
    max-width: 100%;
    padding: 10px;
    visibility: hidden;
    transition: all 0.5s ease-in-out;
    max-height: 0px;
    overflow: hidden;
    &.visible {
      max-height: 450px;
      visibility: visible;
    }
  }
  input {
    width: 90%;
    height: 30px;
    border: 2px solid lightgray;
    font-size: 16px;
    padding-left: 8px;
    margin-bottom: 5px;
  }

  .options {
    width: 100%;

    ul {
      list-style: none;
      text-align: left;
      padding-left: 8px;
      max-height: 200px;
      overflow-y: scroll;
      border: 1px solid lightgray;

      li {
        width: 100%;
        border-bottom: 1px solid lightgray;
        padding: 10px;
        background-color: #241313;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          background: #70878a;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>