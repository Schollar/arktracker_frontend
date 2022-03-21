<template>
  <v-btn icon class="task_button" @click="remove_task(taskId)" color="red"
    ><img class="button_icon" src="@/assets/delete.png" alt="Trash can Icon" />
  </v-btn>
</template>

<script>
export default {
  name: "remove-task-button",
  props: {
    taskId: Number,
  },
  methods: {
    remove_task(taskId) {
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/character-tasks`,
          method: "DELETE",
          data: {
            taskId: taskId,
          },
        })
        // Sending event with the taskId to be removed from the locally stored list
        // Send success message event
        .then((response) => {
          response;
          this.$root.$emit("delete_task", taskId);
          this.$root.$emit("success_message", "Task has been removed!");
        })
        .catch((error) => {
          console.log(error.response);
          this.$root.$emit(
            "error_message",
            "There was an issue removing this task"
          );
        });
    },
  },
};
</script>

<style scoped>
.task_button {
  width: 42px !important;
  min-width: 40px !important;
  font-size: xx-small;
  height: 25px !important;
}
.button_icon {
  width: 25px;
  place-self: end;
}
</style>