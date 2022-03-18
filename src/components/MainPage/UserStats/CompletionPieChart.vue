
<script>
import { Pie, mixins } from "vue-chartjs/";
const { reactiveProp } = mixins;

export default {
  name: "completion-pie-chart",
  methods: {
    user_completion_stats() {},
  },
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>

<style scoped>
</style>