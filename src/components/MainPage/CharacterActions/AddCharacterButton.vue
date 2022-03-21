<template>
  <div class="container">
    <!-- Variable setup to show the form or not and on click changes to true, child emits to change variable to false -->
    <v-btn class="button" @click="form_visible = true">Add Character</v-btn>
    <add-character-form
      v-show="form_visible"
      @form_close="form_visible = false"
    ></add-character-form>
  </div>
</template>

<script>
import AddCharacterForm from "./AddCharacterForm.vue";
export default {
  components: { AddCharacterForm },
  name: "add-character-button",
  data() {
    return {
      form_visible: false,
    };
  },
};
</script>

<style scoped>
.button {
  align-self: start;
  width: 125px !important;
  font-size: x-small;
}
.container {
  align-self: start;
  padding: 0 !important;
}
@media only screen and (min-width: 1024px) {
  .button {
    width: 150px !important;
    font-size: 12px;
  }
}
</style>