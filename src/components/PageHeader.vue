<template>
  <!-- Start of Navigation -->
  <nav>
    <!-- Start of app toolbar -->
    <v-app-bar app prominent src="../assets/banner.jpg">
      <v-app-bar-nav-icon
        color="#b58141"
        v-show="$vuetify.breakpoint.mdAndDown"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase primary--text"
        >Ark Tracker</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <section class="button_container" v-show="$vuetify.breakpoint.lgAndUp">
        <v-btn class="color primary white--text" to="/" exact>Home</v-btn>
        <v-btn class="color primary white--text" to="/profile">Profile</v-btn>
        <v-btn class="color primary white--text" @click="logout">Log Out</v-btn>
      </section>
    </v-app-bar>

    <!-- End of app toolbar -->

    <!-- Start of mobile side menu -->
    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
      bottom
      dark
      class="mobile"
    >
      <!-- Menu title -->
      <v-toolbar flat>
        <v-list>
          <v-list-item>
            <v-list-item-title class="title">Navigation</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- Menu Links -->
      <v-list>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>Home</v-list-item-content>
        </v-list-item>
        <v-list-item to="/profile">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>Profile</v-list-item-content>
        </v-list-item>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content @click="logout">Log Out</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- End of mobile side menu -->
  </nav>
</template>

<script>
export default {
  name: "page-header",
  methods: {
    logout() {
      this.$cookies.remove("logintoken");
      this.$router.push({ path: "/" });
    },
  },
  data() {
    return {
      drawer: false, // Hide mobile side menu by default
    };
  },
};
</script>

<style scoped>
.headline {
  display: grid;
  font-size: 32px !important;
  place-self: center !important;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif !important;
}
.button_container {
  display: grid;
  place-items: end;
  grid-auto-flow: column;
  height: 100%;
}

.mobile {
  height: 25vh !important;
}
</style>