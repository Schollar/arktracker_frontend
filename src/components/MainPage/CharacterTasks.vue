<template>
  <div>
    <v-expansion-panel-content>
      <v-divider class="heading_divider"></v-divider>
      <daily-tasks
        @show_form="form_visible = true"
        :character_tasks="character_tasks"
      ></daily-tasks>
      <weekly-tasks :character_tasks="character_tasks"></weekly-tasks>
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
import DailyTasks from "./DailyTasks.vue";
import WeeklyTasks from "./WeeklyTasks.vue";
export default {
  components: { AddTaskForm, DailyTasks, WeeklyTasks },
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
    this.$root.$on("delete_task", this.delete_task);
    this.$root.$on("add_task", this.add_task);
  },
  methods: {
    close_form() {
      this.form_visible = false;
    },
    add_task(task) {
      console.log(task);
      if (task.taskType === "Daily") {
        this.character_tasks["daily"].push(task);
      } else {
        this.character_tasks["weekly"].push(task);
      }
    },
    delete_task(taskId) {
      this.character_tasks["weekly"] = this.character_tasks["weekly"].filter(
        (task) => task.taskId !== taskId
      );
      this.character_tasks["daily"] = this.character_tasks["daily"].filter(
        (task) => task.taskId !== taskId
      );
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
</style>