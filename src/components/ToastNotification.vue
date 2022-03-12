<template>
  <section class="alert">
    <v-alert
      color="green"
      :value="success_alert"
      dense
      dismissible
      outlined
      prominent
      text
      type="success"
    >
      {{ success_message }}
    </v-alert>
    <v-alert
      color="red"
      dense
      dismissible
      outlined
      prominent
      text
      :value="error_alert"
      type="error"
    >
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
    },
    show_error: function (string) {
      this.error_message = string;
      this.error_alert = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.toast_card {
  display: grid;
  place-items: center;
  width: 250px;
  border: 1px solid white;
  background-color: black;
  color: white;
  border-radius: 10px;
  height: 150px;
  position: fixed;
  top: calc(50% - 125px); // half of width
  left: calc(50% - 125px);

  > p {
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    font-weight: 600;
  }

  > button {
    width: 80%;
    border-radius: 20px;
    border: 1px solid black;
    height: 25px;
    background-color: #1d9bf0;
    color: white;
    font-family: sans-serif;
    font-weight: 775;
    margin-bottom: 10px;
  }
}

.alert {
  width: 80%;
  position: absolute;
  top: 80%;
  left: 10%;

  z-index: 2;
}
</style>