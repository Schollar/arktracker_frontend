<template>
  <div class="weekly_container">
    <section class="tasks_headings">
      <h2>Weekly Tasks</h2>
    </section>
    <v-divider class="heading_divider"></v-divider>
    <section v-if="character_tasks['weekly'] < 1">
      <p>This character has no weekly tasks!</p>
    </section>
    <section
      class="tasks_container"
      v-else
      v-for="task in character_tasks['weekly']"
      :key="task.taskId"
    >
      <section class="task_name">
        {{ task.taskName }}
        <finish-task-button
          :taskId="task.taskId"
          @update_tasks="update_task"
        ></finish-task-button>
        <remove-task-button :taskId="task.taskId"></remove-task-button>
      </section>
      <v-divider class="task_dividers"></v-divider>
      <section class="description_container">
        {{ task.taskDescription }}
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "weekly-tasks",
  props: {
    character_tasks: Object,
  },
};
</script>

<style scoped>
.tasks_headings {
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
}

.add_task {
  font-size: 10px;
  width: 55px;
  height: 28px !important;
}

.heading_divider {
  width: 150%;
  max-width: 275px !important;
  margin-left: -24px;
  background-color: darkgrey;
}
.tasks_container {
  margin-bottom: 20px;
  margin-top: 20px;
}
.task_name {
  display: grid;
  grid-auto-flow: column;
  font-weight: bold;
  place-items: start;
  align-items: end;
}

.task_dividers {
  margin-bottom: 10px;
}
</style>