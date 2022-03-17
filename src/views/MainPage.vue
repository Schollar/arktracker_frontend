<template>
  <div class="page_body">
    <page-header></page-header>
    <v-btn @click="form_visible = true">Add Character</v-btn>
    <v-btn @click="delete_form_visible = true">Delete Character</v-btn>
    <user-characters></user-characters>
    <add-character-form
      v-show="form_visible"
      @form_close="form_visible = false"
    ></add-character-form>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import UserCharacters from "../components/MainPage/UserCharacters.vue";
import AddCharacterForm from "../components/MainPage/AddCharacterForm.vue";
export default {
  components: { PageHeader, UserCharacters, AddCharacterForm },
  name: "main-page",
  data() {
    return {
      form_visible: false,
      delete_form_visible: false,
    };
  },
  mounted() {
    // Running login token check when page is mounted
    this.auth_user();
  },
  methods: {
    // Adding a check to see if a logintoken exits in cookies, if it does not send the user to the login page.
    auth_user() {
      if (this.$cookies.get("logintoken") == null) {
        this.$router.push({ path: "/" });
      }
    },
  },
};
</script>

<style scoped>
.page_body {
  background-color: #15161a;
  height: 100%;
}
</style>