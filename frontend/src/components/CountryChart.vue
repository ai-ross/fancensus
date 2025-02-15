<template>
    <div class="bg-white rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-gray-900">Country Distribution</h2>
      </div>
      <div class="p-6">
        <div class="h-[300px]">
          <Bar 
            :data="chartData" 
            :options="chartOptions" 
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
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const props = defineProps({
    countryStats: {
      type: Object,
      required: true
    }
  });
  
  const chartData = computed(() => ({
    labels: Object.keys(props.countryStats),
    datasets: [
      {
        label: 'Activities by Country',
        data: Object.values(props.countryStats),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  }));
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        padding: 10
      },
      title: {
        display: true,
        text: 'Activities by Country',
        padding: {
          top: 10,
          bottom: 10
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    layout: {
      padding: {
        bottom: 10
      }
    }
  };
</script>