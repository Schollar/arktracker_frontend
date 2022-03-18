<template>
  <div class="small">
    <completion-pie-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"
    ></completion-pie-chart>
  </div>
</template>

<script>
import CompletionPieChart from "./CompletionPieChart.vue";
export default {
  name: "chart-container",
  components: { CompletionPieChart },
  data() {
    return {
      loaded: false,
      chartdata: null,
    };
  },
  mounted() {
    this.get_stats();
  },
  methods: {
    get_stats() {
      var userId = this.$cookies.get("userId");
      this.$axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/api/task-stats`,
          method: "GET",
          params: {
            userId: userId,
          },
        })
        .then((response) => {
          this.chartdata = response.data;
        })
        .catch((error) => {
          error;
          this.$root.$emit(
            "error_message",
            "Unable to retrieve task statistics"
          );
        });
    },
    fill_data() {
      var completed = this.chartdata.completed.length();
      var failed = this.chartdata.failed.length();
      this.chartdata = {
        labels: ["Completed", "Failed"],
        datasets: [
          {
            label: "Completed",
            backgroundColor: "#f87979",
            data: completed,
          },
          {
            label: "Failed",
            backgroundColor: "#f87979",
            data: failed,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>