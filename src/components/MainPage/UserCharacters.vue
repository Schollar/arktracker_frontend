<template>
  <div class="character_container">
    <v-expansion-panels focusable class="characters">
      <v-expansion-panel v-for="char in user_characters" :key="char.charId">
        <v-expansion-panel-header
          >{{ char.name }} {{ char.class }}<v-spacer></v-spacer>
        </v-expansion-panel-header>
        <character-tasks :character="char"></character-tasks>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import CharacterTasks from "./CharacterTasks.vue";
export default {
  components: { CharacterTasks },
  name: "user-characters",
  data() {
    return {
      user_characters: [],
    };
  },
  mounted() {
    this.get_characters();
    this.$root.$on("add_character", this.add_char);
  },
  methods: {
    add_char(char) {
      this.user_characters.push(char);
    },
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
        .then((response) => {
          this.user_characters = response.data;
          // this.$store.commit("update_user_characters", response.data);
        })
        .catch((error) => {
          error;
          this.$root.$emit("error_message", "Unable to retrieve characters");
        });
    },
  },
};
</script>

<style scoped>
.characters {
  width: 70%;
  margin-top: 50px;
}
.character_container {
  display: grid;
  place-items: center;
}
</style>