<template>
  <div>
    <LineChart ref="doughnutRef" :chartData="testData" :options="options" />
    <button @click="shuffleData">Shuffle</button>
  </div>
</template>

<script>
import { shuffle } from "lodash";
import { computed, defineComponent, ref } from "@vue/composition-api";
import { LineChart } from "vue-chart-3";

export default defineComponent({
  name: "Home",
  components: { LineChart },
  setup() {
    const data = ref([30, 40, 60, 70, 5]);
    const doughnutRef = ref();

    const options = ref({
      responsive: true,
      animations: {
        duration: 2500,
        easing: "easeInQuad",
        delay: 10000,
        from: 1,
        to: 0,
        loop: true,
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    });

    const testData = computed(() => ({
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          data: data.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    }));

    function shuffleData() {
      data.value = shuffle(data.value);
    }

    return { testData, shuffleData, doughnutRef, options };
  },
});
</script>