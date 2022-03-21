<template>
  <div class="form_container">
    <v-form ref="form" lazy-validation>
      <v-text-field
        class="input"
        v-model="username"
        :rules="passwordRules"
        label="New Username"
        color="#B58141"
        light
      ></v-text-field>
      <v-text-field
        class="input"
        v-model="email"
        :rules="emailRules"
        label="New Email"
        color="#B58141"
        light
        required
      ></v-text-field
      ><v-text-field
        class="input"
        v-model="password"
        :rules="passwordRules"
        type="password"
        label="Password"
        color="#B58141"
        light
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        color="#B58141"
        class="mr-4"
        @click="edit_user()"
        dark
      >
        Change
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "edit-user",
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    edit_user() {
      // Get userId from cookies and user info from user inputs
      var userId = this.$cookies.get("userId");
      var username = this.username;
      var email = this.email;
      var password = this.password;
      // Check to see for empty values, if empty we send undefined so the backend can detect is as None easier.
      if (username === "") {
        username = undefined;
      }
      if (email === "") {
        email = undefined;
      }
      if (password === "") {
        password = undefined;
      }
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/users`,
          method: "PATCH",
          data: {
            userId: userId,
            username: username,
            email: email,
            password: password,
          },
        })
        // Sending update user event to parent to update the user stored data. Sending success message event. Reset the form
        .then((response) => {
          this.$emit("update_user", response.data);
          this.$root.$emit("success_message", "Info has been updated!");
          this.reset();
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "error_message",
            "Something went wrong editing info"
          );
        });
    },
  },
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
};
</script>

<style lang="scss" scoped>
.form_container {
  width: 100%;
  display: grid;
  place-items: center;
}
</style>