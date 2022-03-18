<template>
  <div class="container">
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
</style>