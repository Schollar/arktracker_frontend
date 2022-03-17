<template>
  <div>
    <v-btn @click="delete_form_visible = true">Delete Character</v-btn>
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
</style>