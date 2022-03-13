<template>
  <v-expansion-panels focusable>
    <v-expansion-panel v-for="char in user_characters" :key="char.id">
      <v-expansion-panel-header
        >{{ char.name }} <v-spacer></v-spacer
        >{{ char.class }}</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        Character tasks underway // Make new task requests will go here
        {{ char.name }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "user-characters",
  computed: {
    user_characters() {
      return this.$store.state.user_characters;
    },
  },
  mounted() {
    this.get_characters();
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
          this.$store.commit("update_user_characters", response.data);
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