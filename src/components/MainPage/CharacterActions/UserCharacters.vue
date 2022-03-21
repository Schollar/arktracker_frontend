<template>
  <!-- IF ROUTE IS PROFILE WE USE THE COMPONENT BUT DIFFERENT HTML ELSE WE USE THE OTHER HTML BELOW -->
  <section class="card_container" v-if="$route.path === '/profile'">
    <h1>Tracked Characters</h1>
    <!-- Loop through user characters -->
    <v-card
      v-for="char in user_characters"
      :key="char.charId"
      class="mx-auto"
      max-width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-avatar tile size="80"
          ><img class="class_icon" :src="img_src[char.class]" alt="Class Icon"
        /></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            {{ char.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <remove-character-button></remove-character-button>
      </v-card-actions>
    </v-card>
  </section>
  <!-- START OF NON USER PROFILE HTML -->
  <section class="character_body" v-else>
    <!-- Check to see if task list is empty to show message -->
    <div v-if="user_characters.length < 1">
      <h1>Please add a character to start tracking tasks!</h1>
    </div>
    <div v-else class="character_container">
      <v-expansion-panels focusable class="characters">
        <!-- Loop through character list -->
        <v-expansion-panel v-for="char in user_characters" :key="char.charId">
          <v-expansion-panel-header>
            <img
              class="class_icon"
              :src="img_src[char.class]"
              alt="Class Icon"
            />
            <v-spacer></v-spacer>
            {{ char.name }}
          </v-expansion-panel-header>
          <character-tasks :character="char"></character-tasks>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </section>
</template>

<script>
import CharacterTasks from "../CharacterTasks/CharacterTasks.vue";
import RemoveCharacterButton from "./RemoveCharacterButton.vue";
export default {
  components: { CharacterTasks, RemoveCharacterButton },
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
      // Get the userId from the cookies
      var userId = this.$cookies.get("userId");
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/characters`,
          method: "GET",
          params: {
            userId: userId,
          },
        })
        // Send data to store to mutate and add character to list
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

<style lang="scss" scoped>
.characters {
  width: 70%;
  margin-top: 25px;
}
.character_container {
  display: grid;
  place-items: center;
  align-self: start;
  width: 100%;
}
.class_icon {
  width: 47px;
  height: 47px;
  flex: none !important;
}

.spacer {
  max-width: 50px;
}

.card_container {
  width: 75%;
  > h1 {
    color: white;
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.7rem !important;
  }
}
.v-card {
  margin-bottom: 50px;
}
.character_body {
  width: 100%;
}
</style>