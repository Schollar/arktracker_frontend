<template>
  <div class="page_body">
    <section class="header">
      <h1 class="title">Ark Tracker</h1>
      <p>
        Welcome to Ark Tracker! A place to keep track of any activity you would
        like to in the world of Arkesia.
      </p>
    </section>
    <section class="form_container">
      <div :is="current_component"></div>
      <div v-show="!current_component"></div>
      <section class="backup_section" v-if="current_component === 'SignupForm'">
        <p>Already a user?</p>
        <v-btn
          color="#B58141"
          class="mr-4"
          dark
          @click="update_component(component_views[1])"
          >Login</v-btn
        >
      </section>
      <section class="backup_section" v-else>
        <p>Not a User Yet?</p>
        <v-btn
          color="#B58141"
          class="mr-4"
          dark
          @click="update_component(component_views[0])"
          >Signup</v-btn
        >
      </section>
    </section>
    <page-footer></page-footer>
  </div>
</template>

<script>
import LoginForm from "@/components/LandingPage/LoginForm.vue";
import SignupForm from "@/components/LandingPage/SignupForm.vue";
import PageFooter from "../components/PageFooter.vue";
export default {
  name: "landing-page",
  components: { LoginForm, SignupForm, PageFooter },
  data() {
    return {
      current_component: "LoginForm",
      component_views: ["SignupForm", "LoginForm"],
    };
  },
  mounted() {
    this.auth_user();
  },
  methods: {
    // Function that updates a variable to show what component is shown on the page
    update_component(component) {
      this.current_component = component;
    },
    // Checks to see if login token exits and sends to main page if it does
    auth_user() {
      if (this.$cookies.get("logintoken") !== null) {
        this.$router.push({ path: "/main-page" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.page_body {
  display: grid;
  place-items: center;
  background-color: #15161a;
  grid-template-rows: 200px 1fr;
  height: 100vh;
}
section {
  display: grid;
  place-items: center;

  > p {
    margin: 10px;
    width: 70%;
    color: #b58141;
    text-align: center;
    font-size: small;
  }
}
.backup_section {
  display: grid;
  width: 100%;
  place-items: center;

  > p {
    padding-right: 16px;
    font-weight: 700;
    text-align: center;
    color: #b58141;
  }
}

.title {
  font-size: 3em !important;
  color: #fe6464;
  margin-bottom: 15px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif !important;
}

.form_container {
  place-self: start;
  justify-self: center;
}
@media only screen and (min-width: 1024px) {
  p {
    font-size: 1rem !important;
    text-align: center;
  }
}
</style>
