<template>
  <v-expansion-panels focusable>
    <v-expansion-panel v-for="(item, i) in 5" :key="i">
      <v-expansion-panel-header>Item</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "user-characters",
  computed: {
    user_tweets() {
      return this.$store.state.user_characters;
    },
  },
  methods: {
    get_characters() {
      var userId = this.$cookies.get("userId");
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/characters`,
          method: "GET",
          params: {
            userId: userId,
          },
        })
        // On success we set a cookie user cookie
        // Call update user mutation
        // Router push to change to the feed page
        .then((response) => {
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
</style>