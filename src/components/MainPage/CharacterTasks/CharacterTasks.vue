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
      @form_close="form_visible = false"
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
    // On mounted we get the character tasks, also listen for child events to add and remove tasks
    this.get_characters_tasks();
    this.$root.$on("delete_task", this.delete_task);
    this.$root.$on("add_task", this.add_task);
  },
  methods: {
    // Closes the form
    close_form() {
      this.form_visible = false;
    },
    add_task(task) {
      // If the task type is daily add it to the daily list, else add it to the weekly list
      if (task.taskType === "Daily") {
        this.character_tasks["daily"].push(task);
      } else {
        this.character_tasks["weekly"].push(task);
      }
    },
    delete_task(taskId) {
      // Filter through both daily and weekly lists to filter out(delete) the task based on the taskId sent as argument
      this.character_tasks["weekly"] = this.character_tasks["weekly"].filter(
        (task) => task.taskId !== taskId
      );
      this.character_tasks["daily"] = this.character_tasks["daily"].filter(
        (task) => task.taskId !== taskId
      );
    },
    get_characters_tasks() {
      // Storing charId to variable to send to get tasks
      var charId = this.character.charId;
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/character-tasks`,
          method: "GET",
          params: {
            charId: charId,
          },
        })
        // Setting character tasks list to data sent back
        .then((response) => {
          this.character_tasks = response.data;
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "error_message",
            "Something went wrong getting characters tasks"
          );
        });
    },
  },
  props: {
    character: Object,
  },
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
}
</style>