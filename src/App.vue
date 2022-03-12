<template>
  <v-app>
    <v-main>
      <router-view />
      <toast-notification></toast-notification>
    </v-main>
  </v-app>
</template>

<script>
import ToastNotification from "@/components/ToastNotification.vue";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    ToastNotification,
  },
};
</script>
