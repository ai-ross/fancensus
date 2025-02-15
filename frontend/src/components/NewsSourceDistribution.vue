<template>
    <div class="bg-white rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-gray-900">Top News Sources</h2>
      </div>
      <div class="p-6">
        <div class="h-[300px]">
          <Bar 
            :data="chartData" 
            :options="options"
          />
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { computed } from 'vue';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Bar } from 'vue-chartjs';
  import _ from 'lodash';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  });
  
  const chartData = computed(() => {
    const sourceCounts = _.countBy(props.data, 'name');
    const sortedSources = Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1]);
  
    return {
      labels: sortedSources.map(([source]) => source),
      datasets: [{
        label: 'Articles Published',
        data: sortedSources.map(([_, count]) => count),
        backgroundColor: 'rgba(54, 162, 235, 0.8)'
      }]
    };
  });
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };
</script>