<template>
  <div>
    <v-expansion-panel-content>
      <section class="tasks_headings">
        <h3>DAILY TASKS</h3>
        <v-btn
          color="#B58141"
          class="add_task"
          @click="form_visible = !form_visible"
          >Add Task</v-btn
        >
      </section>
      <section class="tasks">
        <section v-if="character_tasks['daily'] < 1">
          <p>This character has no daily tasks!</p>
        </section>
        <section
          v-else
          v-for="task in character_tasks['daily']"
          :key="task.taskId"
        >
          <section class="task_name">
            {{ task.taskName }} {{ task.taskType }}
          </section>
          <v-divider></v-divider>
          {{ task.taskDescription }}
        </section>
        <v-divider></v-divider>
        <h1>WEEKLY TASKS</h1>
        <section v-if="character_tasks['weekly'] < 1">
          <p>This character has no weekly tasks!</p>
        </section>
        <section
          v-else
          v-for="task in character_tasks['weekly']"
          :key="task.taskId"
        >
          {{ task.taskName }}
          {{ task.taskDescription }}
          {{ task.taskType }}
        </section>
      </section>
    </v-expansion-panel-content>
    <add-task-form
      :charId="character.charId"
      @form_close="close_form"
      v-show="form_visible"
    ></add-task-form>
  </div>
</template>

<script>
import AddTaskForm from "./AddTaskForm.vue";
export default {
  components: { AddTaskForm },
  name: "character-tasks",
  data() {
    return {
      u_character: this.character,
      character_tasks: [],
      form_visible: false,
    };
  },
  mounted() {
    this.get_characters_tasks();
  },
  methods: {
    close_form() {
      this.form_visible = false;
    },
    get_characters_tasks() {
      var charId = this.character.charId;
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/character-tasks`,
          method: "GET",
          params: {
            charId: charId,
          },
        })
        // On success we set a cookie user cookie
        // Call update user mutation
        // Router push to change to the feed page
        .then((response) => {
          this.character_tasks = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          this.$root.$emit("error_message", "Invalid Username or Password");
        });
    },
  },
  props: {
    character: Object,
  },
};
</script>

<style scoped>
.tasks_headings {
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  margin-top: 10px;
}
.add_task {
  font-size: 10px;
  width: 55px;
  height: 28px !important;
}
.tasks {
  margin-top: 25px;
}
</style>