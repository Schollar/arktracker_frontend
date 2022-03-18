<template>
  <div class="character_container">
    <v-expansion-panels focusable class="characters">
      <v-expansion-panel v-for="char in user_characters" :key="char.charId">
        <v-expansion-panel-header>
          <img class="class_icon" :src="img_src[char.class]" alt="Class Icon" />
          <v-spacer></v-spacer>
          {{ char.name }}
        </v-expansion-panel-header>
        <character-tasks :character="char"></character-tasks>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import CharacterTasks from "../CharacterTasks.vue";
export default {
  components: { CharacterTasks },
  name: "user-characters",
  data() {
    return {
      img_src: {
        Berserker: "/berserker1.png",
        Paladin: "/paladin.png",
        Gunlancer: "/gunlancer.png",
        Striker: "/striker.png",
        Wardancer: "/wardancer.png",
        Scrapper: "/scrapper.png",
        Soulfist: "/soulfist.png",
        Gunslinger: "/gunslinger.png",
        Artillerist: "/artillerist.png",
        DeadEye: "/deadeye.png",
        Sharpshooter: "/sharpshooter.png",
        Bard: "/bard.png",
        Sorceress: "/sorceress.png",
        Shadowhunter: "/shadowhunter.png",
        Deathblade: "/deathblade.png",
      },
    };
  },
  computed: {
    user_characters() {
      return this.$store.state["user_characters"];
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
        .then((response) => {
          this.$store.commit("update_user_characters", response.data);
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
  margin-top: 25px;
}
.character_container {
  display: grid;
  place-items: center;
  align-self: start;
}
.class_icon {
  width: 47px;
  height: 47px;
  flex: none !important;
}

.spacer {
  max-width: 50px;
}
</style>