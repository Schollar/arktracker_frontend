<template>
  <v-form ref="form" lazy-validation>
    <h1>Start a Task</h1>
    <v-text-field
      class="input"
      v-model="name"
      label="Task Name"
      color="#B58141"
      required
      dark
    ></v-text-field>
    <v-text-field
      class="input"
      v-model="description"
      label="Task Description"
      color="#B58141"
      dark
      required
    ></v-text-field>
    <v-select
      class="input"
      :items="items"
      label="Task Type"
      dense
      dark
    ></v-select>
    <v-btn color="#B58141" class="mr-4" @click="login_user()" dark>
      Start Task
    </v-btn>
    <v-btn color="red" class="mr-4" @click="close_form()" dark> Close </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "add-task-form",
  methods: {
    close_form() {
      this.$emit("form_close");
    },
  },
  data() {
    return {
      items: ["Daily", "Weekly"],
    };
  },
};
</script>

<style lang="scss" scoped>
form {
  position: absolute;
  top: 50%;
  left: 15%;
  z-index: 4;
  color: white;
}
.input {
  max-width: 75%;
  margin-top: 20px;
}
</style>