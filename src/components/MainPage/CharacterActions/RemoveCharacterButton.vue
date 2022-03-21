<template>
  <div class="container">
    <!-- On click changes variable to true to show form component -->
    <v-btn class="button" color="#FE6464" @click="delete_form_visible = true"
      >Remove Character</v-btn
    >
    <!-- Only shows if variable is true, listens for child event to change variable to false -->
    <delete-character-form
      v-show="delete_form_visible"
      @delete_form_close="delete_form_visible = false"
    ></delete-character-form>
  </div>
</template>

<script>
import DeleteCharacterForm from "./DeleteCharacterForm.vue";
export default {
  name: "remove-character-button",
  data() {
    return {
      delete_form_visible: false,
    };
  },
  components: {
    DeleteCharacterForm,
  },
};
</script>

<style scoped>
.button {
  justify-self: end;
  width: 125px !important;
  font-size: x-small;
}
.container {
  padding: 0 !important;
  display: grid;
}
@media only screen and (min-width: 1024px) {
  .button {
    width: 150px !important;
    font-size: 12px;
  }
}
</style>