<template>
  <div class="container">
    <v-btn class="button" color="#FE6464" @click="delete_form_visible = true"
      >Remove Character</v-btn
    >
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
</style>