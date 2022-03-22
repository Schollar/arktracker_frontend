<template>
  <div class="page_body">
    <page-header></page-header>
    <section class="character_button_container">
      <add-character-button></add-character-button>
      <remove-character-button></remove-character-button>
    </section>
    <user-characters></user-characters>
    <chart-container></chart-container>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import UserCharacters from "../components/MainPage/CharacterActions/UserCharacters.vue";
import AddCharacterButton from "../components/MainPage/CharacterActions/AddCharacterButton.vue";
import RemoveCharacterButton from "../components/MainPage/CharacterActions/RemoveCharacterButton.vue";
import ChartContainer from "../components/MainPage/UserStats/ChartContainer.vue";
import PageFooter from "../components/PageFooter.vue";
export default {
  components: {
    PageHeader,
    UserCharacters,
    AddCharacterButton,
    RemoveCharacterButton,
    ChartContainer,
    PageFooter,
  },
  name: "main-page",
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
  display: grid;
  place-items: center;
  grid-template-rows: 1px 75px 1fr;
  height: 100%;
}
.character_button_container {
  display: grid;
  place-items: center;
  grid-auto-flow: column;
  padding-top: 20px;
  width: 70%;
}
</style>