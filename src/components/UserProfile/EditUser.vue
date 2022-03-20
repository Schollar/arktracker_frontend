<template>
  <div class="form_container">
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
      @click="CHANGE_ME"
      dark
    >
      Change
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "edit-user",
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