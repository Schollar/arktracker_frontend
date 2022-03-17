<template>
  <div>
    <v-form ref="form" lazy-validation>
      <h1>Start a Task</h1>
      <v-text-field
        class="input"
        v-model="name"
        label="Character Name"
        color="#B58141"
        required
        dark
      ></v-text-field>
      <v-select
        class="input"
        v-model="type"
        :items="items"
        label="Task Type"
        dense
        dark
      ></v-select>
      <v-btn color="#B58141" class="mr-4" @click="add_task" dark>
        Start Task
      </v-btn>
      <v-btn color="red" class="mr-4" @click="close_form" dark> Close </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "add-character-form",
  data() {
    return {
      items: ["Daily", "Weekly"],
    };
  },
};
</script>

<style scoped>
</style>