<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 text-center">
        {{ new Date().getFullYear() }} — <strong>Ark Tracker</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "page-footer",
};
</script>

<style scoped>
.v-footer {
  display: grid;
  position: absolute;
  bottom: 0%;
  place-items: center;
  width: 100vw;
}
.v-card__text {
  width: 100vw;
  background-color: #212329;
  color: #b58141 !important;
}
</style>