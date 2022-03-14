<template>
  <v-expansion-panel-content>
    <h1>DAILY TASKS</h1>
    <section v-if="character_tasks['daily'] < 1">
      <p>This character has no daily tasks!</p>
    </section>
    <section v-else v-for="task in character_tasks['daily']" :key="task.taskId">
      {{ task.taskName }}
      {{ task.taskDescription }}
      {{ task.taskType }}
    </section>
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
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: "character-tasks",
  data() {
    return {
      u_character: this.character,
      character_tasks: [],
    };
  },
  mounted() {
    this.get_characters_tasks();
  },
  methods: {
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