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
</template>

<script>
export default {
  name: "add-task-form",
  props: {
    charId: Number,
  },
  methods: {
    close_form() {
      this.$emit("form_close");
    },

    add_task() {
      var userId = this.$cookies.get("userId");
      var taskname = this.name;
      var taskdescription = this.description;
      var tasktype = this.type;
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/character-tasks`,
          method: "POST",
          data: {
            userId: userId,
            taskName: taskname,
            taskDescription: taskdescription,
            taskType: tasktype,
            charId: this.charId,
          },
        })
        .then((response) => {
          var new_task = response.data;
          this.$emit("form_close");
          this.$root.$emit("success_message", "Tracking new task!");
          this.$root.$emit("add_task", new_task);
        })
        .catch((error) => {
          error;
          this.$root.$emit("error_message", "Invalid Username or Password");
        });
    },
  },
  data() {
    return {
      items: ["Daily", "Weekly"],
      name: "",
      description: "",
      type: "",
    };
  },
};
</script>

<style lang="scss" scoped>
form {
  position: absolute;
  top: 25%;
  z-index: 4;
  color: white;
}
.input {
  max-width: 75%;
  margin-top: 20px;
}
</style>