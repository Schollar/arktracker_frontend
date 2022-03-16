<template>
  <v-btn icon class="task_button" @click="complete_task(task.taskId)"
    ><img class="button_icon" src="@/assets/success.png" alt="Trash can Icon" />
  </v-btn>
</template>

<script>
export default {
  name: "finish-task-button",
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
  width: 25px;
}
</style>