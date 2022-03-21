
<script>
// Importing a linechart
import { Line } from "vue-chartjs/";

export default {
  // This takes in the props sent from parent, sets the chart type to line
  extends: Line,
  name: "completion-pie-chart",
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },

  mounted() {
    // Render the chart on the page with the data and options sent from the parent
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style scoped>
</style>