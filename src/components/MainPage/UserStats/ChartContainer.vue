<template>
  <div class="small">
    <h1>Your Task Stats</h1>
    <div>
      <completion-pie-chart
        class="chart"
        v-if="loaded"
        :chartData="chartdata"
        :options="options"
        :width="1000"
        :height="700"
      ></completion-pie-chart>
    </div>
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
      options: {},
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
          this.fill_data(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.$root.$emit(
            "error_message",
            "Unable to retrieve task statistics"
          );
        });
    },
    fill_data(data) {
      var days = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      };
      // Loop through the completed array
      for (var i = 0; i < data["completed"].length; i++) {
        // Set the date equal to the string value of the data object at completed, at index i(in the loop) at the completed at object key.
        var datetime = new Date(data["completed"][i]["completed_at"]);
        // Get the Time portion of the datetime string now set at variable myDate
        var time = datetime.getTime() % (3600 * 1000 * 24);
        // Subtract the time portion to get the date only.
        var date = new Date(datetime - time);
        // Get the day of the week of the date we just got. Return value is 0-6, starting sunday- saturday
        var day = date.getDay();
        // Go up into our days object above, when we get the return numeric value we add one to the object key's value
        days[day] += 1;
      }
      // Turning the days object into an array to be used for chart data.
      var completed_data = Object.values(days);
      this.chartdata = {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Completed Tasks",
            fill: false,
            borderColor: "#b58141",
            backgroundColor: "#b58141",
            data: completed_data,
          },
        ],
      };
      this.options = {
        title: {
          display: true,
          text: "Weekly Completed Tasks",
        },
        scales: {
          y: {
            // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100,
          },
        },
      };
      this.options["animation"] = {
        duration: 2500,
        easing: "linear",
        delay: 10000,
        from: 1,
        to: 0,
        loop: true,
      };
      this.loaded = true;
    },
  },
};
</script>

<style scoped>
.small {
  text-align: center;
  color: white;
  max-width: 75vw;
  margin: 150px auto;
}
@media only screen and (max-width: 600px) {
  .small {
    max-width: 90vw !important;
  }
  .chart {
    width: 100% !important;
  }
}
</style>