<template>
  <div>
    <v-form ref="form" lazy-validation>
      <h1>Add Character</h1>
      <v-text-field
        class="input"
        v-model="name"
        label="Character Name"
        color="#B58141"
        required
        dark
      ></v-text-field>
      <v-select
        class="input"
        v-model="char_class"
        :items="classes"
        label="Class"
        dense
        dark
      ></v-select>
      <v-btn color="#B58141" class="mr-4" @click="add_character" dark>
        Add Character
      </v-btn>
      <v-btn color="red" class="mr-4" @click="close_form" dark> Close </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "add-character-form",
  data() {
    return {
      name: "",
      char_class: "",
      charClass: "",
      classes: [
        "Berserker",
        "Paladin",
        "Gunlancer",
        "Striker",
        "Wardancer",
        "Scrapper",
        "Soulfist",
        "Gunslinger",
        "Artillerist",
        "Deadeye",
        "Sharpshooter",
        "Bard",
        "Sorceress",
        "Shadowhunter",
        "Deathblade",
      ],
    };
  },
  methods: {
    close_form() {
      this.$emit("form_close");
      this.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
    add_character() {
      var userId = this.$cookies.get("userId");
      var charName = this.name;
      var charClass = this.char_class;
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/characters`,
          method: "POST",
          data: {
            userId: userId,
            charName: charName,
            class: charClass,
          },
        })
        .then((response) => {
          this.$store.commit("add_user_character", response.data);
          this.$emit("form_close");
          this.reset();
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "error_message",
            "Something went wrong. Please try again."
          );
        });
    },
  },
};
</script>

<style scoped>
form {
  position: absolute;
  top: 25%;
  z-index: 4;
  color: white;
}
.input {
  max-width: 75%;
  margin-top: 20px;
}
</style>