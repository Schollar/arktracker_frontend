<template>
  <div class="page_body">
    <page-header></page-header>
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
export default {
  components: { PageHeader },
  name: "main-page",
};
</script>

<style scoped>
.page_body {
  background-color: #15161a;
  height: 100vh;
}
</style>