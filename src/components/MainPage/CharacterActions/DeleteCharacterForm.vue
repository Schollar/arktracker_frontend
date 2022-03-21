<template>
  <v-form ref="form" lazy-validation>
    <section class="headings">
      <h1>Remove Character</h1>
      <p>Type the character name to remove</p>
    </section>

    <v-text-field
      class="input"
      v-model="name"
      label="Character Name"
      color="#B58141"
      required
      dark
    ></v-text-field>
    <v-btn color="#B58141" class="mr-4" @click="add_character" dark>
      Remove Character
    </v-btn>
    <v-btn color="red" class="mr-4" @click="close_form" dark> Close </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "delete-character-form",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    //   First two functions close and reset the form
    close_form() {
      this.$emit("delete_form_close");
      this.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
    // Request to delete character, takes in userId from cookie and character name from form
    add_character() {
      var userId = this.$cookies.get("userId");
      var charName = this.name;
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/characters`,
          method: "DELETE",
          data: {
            userId: userId,
            charName: charName,
          },
        })
        // Commit a mutation to the store to remove the character from the user_characters array, response.data received is a charId to make things easy
        // Emmit to close the form, reset the form, and emit to send a success message to user
        .then((response) => {
          this.$store.commit("remove_user_character", response.data);
          this.$emit("delete_form_close");
          this.reset();
          this.$root.$emit("success_message", "Character has been removed!");
        })
        // If error happens we send error message to user, close and reset the form(do I want to reset the form?)
        .catch((error) => {
          error;
          this.$emit("delete_form_close");
          this.$root.$emit(
            "error_message",
            "Something went wrong removing the character"
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  position: absolute;
  top: 25%;
  left: 12%;
  z-index: 4;
  color: white;
  border: 1px solid #212329;
  border-radius: 15px;
  background-color: #212329;
  display: grid;
  width: 75vw;
  place-items: center;
}
.v-btn {
  margin-top: 20px;
  margin-bottom: 10px;
}
.input {
  width: 75%;
  margin-top: 20px;
}
.headings {
  margin-top: 10px;
  display: grid;
  place-items: center;

  > p {
    width: 65%;
    text-align: center;
    margin-top: 15px;
  }
}
</style>