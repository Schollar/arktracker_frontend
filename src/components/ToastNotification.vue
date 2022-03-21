<template>
  <section class="alert">
    <v-alert :value="success_alert" dismissible type="success">
      {{ success_message }}
    </v-alert>
    <v-alert color="red" dismissible :value="error_alert" type="error">
      {{ error_message }}
    </v-alert>
  </section>
</template>

<script>
export default {
  name: "toast-notification",
  data() {
    return {
      success_message: "",
      error_message: "",
      success_alert: false,
      error_alert: false,
    };
  },
  // Listening for the global event api message which is sent on every axios request error, and one or two successful requests, and we call the show message function
  mounted() {
    this.$root.$on("success_message", this.show_success);
    this.$root.$on("error_message", this.show_error);
  },
  methods: {
    // This function takes the string it receives and sets the api message variable to it
    // Then sets the show_toast variable to true to show the notifaction card on the page
    show_success: function (string) {
      this.success_message = string;
      this.success_alert = true;
      // Setting interval to hide the message after 3 seconds
      setInterval(() => {
        this.success_alert = false;
      }, 3000);
    },
    show_error: function (string) {
      this.error_message = string;
      this.error_alert = true;
      setInterval(() => {
        this.error_alert = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  width: 80%;
  position: absolute;
  top: 80vh;
  left: 10%;

  z-index: 2;
}
</style>