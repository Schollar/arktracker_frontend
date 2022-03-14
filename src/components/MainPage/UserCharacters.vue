<template>
  <v-expansion-panels focusable class="characters">
    <v-expansion-panel v-for="char in user_characters" :key="char.charId">
      <v-expansion-panel-header
        >{{ char.name }} <v-spacer></v-spacer
        >{{ char.class }}</v-expansion-panel-header
      >
      <character-tasks :character="char"></character-tasks>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import CharacterTasks from "./CharacterTasks.vue";
export default {
  components: { CharacterTasks },
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
.characters {
  width: 60%;
}
</style>