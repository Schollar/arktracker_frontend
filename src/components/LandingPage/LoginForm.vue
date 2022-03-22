<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      class="input"
      v-model="username"
      :counter="15"
      :rules="usernameRules"
      label="Username"
      color="#B58141"
      required
      dark
    ></v-text-field>
    <v-text-field
      class="input"
      v-model="password"
      :rules="passwordRules"
      type="password"
      label="Password"
      color="#B58141"
      dark
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="#B58141"
      class="mr-4"
      @click="login_user()"
      dark
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "login-form",
  // RULES for the form, Username and PW both required and length rules. From vuetify docs.
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) =>
        (v && v.length <= 15) || "Username must be less than 15 characters",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be more than 6 characters",
    ],
  }),

  methods: {
    login_user() {
      // Get the value from the username and password filled out and use that data to pass to our api call
      var username = this.username;
      var password = this.password;
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/login`,
          method: "POST",
          data: {
            username: username,
            password: password,
          },
        })
        // On success we set a logintoken cookie and userId cookie
        // Call update user mutation
        // Router push to change to the main page
        .then((response) => {
          response;
          this.$cookies.set("logintoken", response.data["loginToken"]);
          this.$cookies.set("userId", response.data["userId"]);
          this.$store.commit("update_user", response.data);
          this.$router.push({ path: "/main-page" });
        })
        .catch((error) => {
          console.log(error.response);
          this.$root.$emit("error_message", "Invalid Username or Password");
        });
    },
  },
};
</script>

<style scoped>
form {
  border: 1px solid #212329;
  border-radius: 15px;
  width: 75vw;
  display: grid;
  place-items: center;
  background-color: #212329;
  padding-top: 15px;
}
.input {
  width: 75%;
}
button {
  margin-bottom: 20px;
}
@media only screen and (min-width: 1024px) {
  form {
    width: 35vw;
  }
}
</style>
