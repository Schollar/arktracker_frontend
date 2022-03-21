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

<style lang="scss" scoped>
.tasks {
  width: 100%;
}
.daily_container {
  display: grid;
  place-items: center;
}
.tasks_headings {
  justify-self: start;
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  place-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
}

.add_task {
  font-size: 10px;
  width: 55px;
  height: 28px !important;
  align-self: end;
}

.heading_divider {
  width: 100%;
  margin-bottom: 25px;
  background-color: darkgrey;
}
.tasks_container {
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
}
.task_name {
  display: grid;
  grid-template-columns: 1fr 30px 30px;
  font-weight: bold;
  place-items: start;
}

.task_dividers {
  margin-bottom: 10px;
}
</style>