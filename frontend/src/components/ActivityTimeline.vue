<template>
    <div class="bg-white rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-gray-900">Activity Timeline</h2>
      </div>
      <div class="p-6">
        <div class="h-[300px]">
          <Line 
            :data="timelineData" 
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
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Line } from 'vue-chartjs';
  import _ from 'lodash';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
  
  const timelineData = computed(() => {
    const groupedByDate = _.groupBy(props.data, item => 
      new Date(item.date).toISOString().split('T')[0]
    );
    
    const dates = Object.keys(groupedByDate).sort();
    const counts = dates.map(date => groupedByDate[date].length);
  
    return {
      labels: dates.map(date => new Date(date).toLocaleDateString()),
      datasets: [{
        label: 'Daily Activities',
        data: counts,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  });
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Activity Timeline'
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