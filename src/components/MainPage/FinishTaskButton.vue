<template>
  <!-- passing the taskId as an arg to the complete task function -->
  <v-btn icon class="task_button" @click="complete_task(taskId)"
    ><img class="button_icon" src="@/assets/success.png" alt="Trash can Icon" />
  </v-btn>
</template>

<script>
export default {
  name: "finish-task-button",
  props: {
    taskId: Number,
  },
  methods: {
    // Function that takes taskId as arg and sends it in the patch request data
    complete_task(taskId) {
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/character-tasks`,
          method: "PATCH",
          data: {
            taskId: taskId,
          },
        })
        // ##TODO Emit another event to put task into completed task list.
        .then((response) => {
          response;
          this.$root.$emit("delete_task", taskId);
          this.$root.$emit("success_message", "Task has been completed!");
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "error_message",
            "Something went wrong deleting the task."
          );
        });
    },
  },
};
</script>

<style scoped>
.task_button {
  justify-self: end;
  width: 42px !important;
  min-width: 40px !important;
  font-size: xx-small;
  height: 25px !important;
}
.button_icon {
  width: 20px;
}
</style>