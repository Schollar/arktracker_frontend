<template>
  <div class="character_container">
    <v-expansion-panels focusable class="characters">
      <v-expansion-panel v-for="char in user_characters" :key="char.charId">
        <v-expansion-panel-header>
          <img class="class_icon" src="img_src" alt="Class Icon" />
          {{ char.name }} {{ char.class }}<v-spacer></v-spacer>
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
        Berserker: "@/assets/berserker.png",
        Paladin: "@/assets/paladin.png",
        Gunlancer: "@/assets/gunlancer.png",
        Striker: "@/assets/striker.png",
        Wardancer: "@/assets/wardancer.png",
        Scrapper: "@/assets/scrapper.png",
        Soulfist: "@/assets/soulfist.png",
        Gunslinger: "@/assets/gunslinger.png",
        Artillerist: "@/assets/artillerist.png",
        Deadeye: "@/assets/deadeye.png",
        Sharpshooter: "@/assets/sharpshooter.png",
        Bard: "@/assets/bard.png",
        Sorceress: "@/assets/sorceress.png",
        Shadowhunter: "@/assets/shadowhunter.png",
        Deathblade: "@/assets/deathblade.png",
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
  margin-top: 50px;
}
.character_container {
  display: grid;
  place-items: center;
}
.class_icon {
  width: 50px;
  height: 50px;
}
</style>