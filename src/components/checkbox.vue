<template>
  <div>
    <input
      type="text"
      placeholder="enter user name"
      v-model="signupForm.username"
    />
    <br />
    <br />
    <input
      type="password"
      placeholder="enter password"
      v-model="signupForm.password"
    />
    <br />
    <br />
    <p>Hobbies</p>

    <input
      type="checkbox"
      value="travel"
      id="travel"
      v-model="signupForm.hobbies"
    />
    <label for="travel">Travel</label> <br />
    <br />
    <input
      type="checkbox"
      value="sports"
      id="sports"
      v-model="signupForm.hobbies"
    />
    <label for="sports">Sports</label>
    <br />
    <br />
    <p>Gender</p>

    <input type="radio" value="male" id="male" v-model="signupForm.gender" />
    <label for="male">Male</label> <br />
    <br />
    <input
      type="radio"
      value="female"
      id="female"
      v-model="signupForm.gender"
    />
    <label for="female">female</label>
    <button v-on:click="signupUser">Sign Up</button>
    <br />
    <br />
  </div>
</template>

<script>
// Imports
export default {
  name: "myCheckbox",
  data() {
    return {
      signupForm: {
        username: null,
        password: null,
        hobbies: [],
        gender: null,
      },
    };
  },
  methods: {
    signupUser() {
      console.log("Hi !", this.signupForm);
    },
  },
};
</script>

<style scoped>
#add-blog * {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 500px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}
#checkboxes label {
  display: inline-block;
  margin-top: 0;
}
</style>
