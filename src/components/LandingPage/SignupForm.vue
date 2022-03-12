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
  name: "signup-form",
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) =>
        (v && v.length <= 15) || "Username must be less than 15 characters",
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
        // On success we set a cookie user cookie
        // Call update user mutation
        // Router push to change to the feed page
        .then((response) => {
          response;
          this.$cookies.set("logintoken", response.data["loginToken"]);
          this.$store.commit("update_user", response.data);
          this.$cookies.set("userId", response.data["userId"]);
          this.$router.push({ path: "/main-page" });
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "error_message",
            "Invalid Username or password. Please try again."
          );
        });
    },
  },
};
</script>

<style>
form {
  border: 1px solid #212329;
  border-radius: 15px;
  background-color: #212329;
  display: grid;
  width: 75vw;
  place-items: center;
}
.input {
  width: 75%;
}
.mr-4 {
  margin-bottom: 20px;
  justify-self: center;
  margin-left: 10px;
}
</style>