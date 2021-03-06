<template>
  <v-form class="signup_form" ref="form" v-model="valid" lazy-validation>
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
      required
      dark
    ></v-text-field>
    <v-text-field
      class="input"
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      dark
      color="#B58141"
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="#B58141"
      class="mr-4"
      dark
      @click="signup_user()"
    >
      Signup
    </v-btn>
    <v-btn color="#DD163B" class="mr-4" @click="reset" dark> Reset Form </v-btn>
  </v-form>
</template>

<script>
export default {
  // RULES for the form, Username and PW both required and length rules. From vuetify docs.
  //  Email must also be valid
  name: "signup-form",
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) =>
        (v && v.length <= 15 && v.length >= 3) ||
        "Username must be less than 15 characters and greater than 3",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be more than 6 characters",
    ],
  }),

  methods: {
    // Resets the form
    reset() {
      this.$refs.form.reset();
    },
    signup_user() {
      // Get the value from the username and password filled out and use that data to pass to our api call
      var username = this.username;
      var password = this.password;
      var email = this.email;
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/users`,
          method: "POST",
          data: {
            username: username,
            password: password,
            email: email,
          },
        })
        // On success we set a logintoken and userId cookie
        // Call update user mutation
        // Router push to change to the main page
        .then((response) => {
          this.$cookies.set("logintoken", response.data["loginToken"]);
          this.$store.commit("update_user", response.data);
          this.$cookies.set("userId", response.data["userId"]);
          this.$router.push({ path: "/main-page" });
        })
        .catch((error) => {
          error;
          this.$root.$emit("error_message", "Something went wrong signing up");
        });
    },
  },
};
</script>

<style scoped>
.signup_form {
  border: 1px solid #212329;
  border-radius: 15px;
  background-color: #212329;
  display: grid;
  width: 75vw;
  place-items: center;
  padding-top: 15px;
}
.input {
  width: 75%;
}
.mr-4 {
  margin-bottom: 20px;
  justify-self: center;
  margin-left: 10px;
}
@media only screen and (min-width: 1024px) {
  .signup_form {
    width: 35vw;
  }
}
</style>