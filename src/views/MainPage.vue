<template>
  <div class="page_body">
    <page-header></page-header>
    <user-characters></user-characters>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import UserCharacters from "../components/MainPage/UserCharacters.vue";
export default {
  components: { PageHeader, UserCharacters },
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
  height: 100%;
}
</style>