<template>
  <div class="card_container">
    <section>
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <p @click="input_visible = !input_visible">Edit</p>
            <v-list-item-title class="heading text-h5 mb-1">
              {{ user.username }}
            </v-list-item-title>
            <v-list-item-subtitle>Username</v-list-item-subtitle>
            <v-list-item-title class="email text-h5 mb-1">{{
              user.email
            }}</v-list-item-title>
            <v-list-item-subtitle>Email</v-list-item-subtitle>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <edit-user
            @update_user="update_user"
            v-show="input_visible"
          ></edit-user>
        </v-card-actions>
      </v-card>
    </section>
  </div>
</template>

<script>
import EditUser from "./EditUser.vue";
export default {
  components: { EditUser },
  name: "user-info",
  mounted() {
    this.get_info();
  },
  data() {
    return {
      user: {},
      input_visible: false,
    };
  },
  methods: {
    // Updating user data, turning variable to false to hide form
    update_user(data) {
      this.user = data;
      this.input_visible = false;
    },
    get_info() {
      // Getting userId from cookies
      var userId = this.$cookies.get("userId");
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/users`,
          method: "GET",
          params: {
            userId: userId,
          },
        })
        // Setting user object to response data sent back
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "error_message",
            "Unable to retrieve user information"
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: right;
}
p:hover {
  text-decoration: underline;
}
.card_container {
  width: 75%;
  margin-bottom: 50px;
}
.v-list-item__subtitle {
  margin-bottom: 20px !important;
}
.heading {
  margin-top: 25px;
}
</style>