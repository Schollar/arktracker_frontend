<template>
  <div class="daily_container">
    <section class="tasks_headings">
      <h2>Daily Tasks</h2>
      <v-btn color="#B58141" class="add_task" @click="show_form"
        >Add Task</v-btn
      >
    </section>
    <v-divider class="heading_divider"></v-divider>
    <section class="tasks">
      <section v-if="character_tasks['daily'] < 1">
        <p>This character has no daily tasks!</p>
      </section>
      <section
        class="tasks_container"
        v-else
        v-for="task in character_tasks['daily']"
        :key="task.taskId"
      >
        <section class="task_name">
          {{ task.taskName }}
          <finish-task-button :taskId="task.taskId"></finish-task-button>
          <remove-task-button :taskId="task.taskId"></remove-task-button>
        </section>
        <v-divider class="task_dividers"></v-divider>
        <section class="description_container">
          {{ task.taskDescription }}
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import RemoveTaskButton from "./RemoveTaskButton.vue";
import FinishTaskButton from "./FinishTaskButton.vue";
export default {
  name: "daily-tasks",
  methods: {
    show_form() {
      this.$emit("show_form");
    },
  },
  components: {
    RemoveTaskButton,
    FinishTaskButton,
  },
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
}

.heading_divider {
  width: 100%;
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

@media only screen and (min-width: 600px) {
  h2 {
    justify-self: end;
    margin-left: 40px;
  }
  .add_task {
    justify-self: end;
    font-weight: bolder;
  }
}
@media only screen and (min-width: 1024px) {
  .add_task {
    font-size: 12px;
    width: 75px;
    height: 38px !important;
  }
}
</style>