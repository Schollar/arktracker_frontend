<template>
  <div class="page_body">
    <page-header></page-header>
    <section class="container">
      <h1>Your Info</h1>
      <user-info></user-info>
      <user-characters></user-characters>
    </section>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import UserInfo from "../components/UserProfile/UserInfo.vue";
import UserCharacters from "../components/MainPage/CharacterActions/UserCharacters.vue";
import PageFooter from "../components/PageFooter.vue";
export default {
  components: { PageHeader, UserInfo, UserCharacters, PageFooter },
  name: "user-profile",
  computed: {
    user_characters() {
      return this.$store.state["user_characters"];
    },
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

<style lang="scss" scoped>
.page_body {
  background-color: #15161a;
  height: 100%;
}
.container {
  display: grid;
  place-items: center;
  > h1 {
    color: white;
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.7rem !important;
  }
}
h1 {
  color: #b58141 !important;
}
</style>