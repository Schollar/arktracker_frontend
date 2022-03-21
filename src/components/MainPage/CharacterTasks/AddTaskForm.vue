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
    // Close and reset form
    close_form() {
      this.$emit("form_close");
      this.reset();
    },
    reset() {
      this.$refs.form.reset();
    },

    add_task() {
      // Getting the userId from cookies and other info from user inputs
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
            // Sending the charId aswell to get the tasks for this char
            charId: this.charId,
          },
        })
        // Setting the data to a variable to send off in an event to add the task to the characters task list already stored
        // Close, reset and send a success message
        .then((response) => {
          var new_task = response.data;
          this.$emit("form_close");
          this.$root.$emit("success_message", "Tracking new task!");
          this.$root.$emit("add_task", new_task);
          this.reset();
        })
        .catch((error) => {
          error;
          this.$root.$emit("error_message", "Error adding task");
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
  left: -4%;
  z-index: 4;
  color: white;
  border: 1px solid #212329;
  border-radius: 15px;
  background-color: #212329;
  display: grid;
  width: 75vw;
  place-items: center;
}
.v-btn {
  margin-top: 20px;
  margin-bottom: 10px;
}
.input {
  width: 75%;
  margin-top: 20px;
}
</style>