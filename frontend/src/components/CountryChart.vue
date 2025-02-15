<template>
  <div class="bg-white rounded-lg border">
    <div class="p-6 border-b">
      <h2 class="text-xl font-bold text-gray-900">Country Distribution</h2>
    </div>
    <div class="p-6">
      <div class="h-[300px]">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import type { ChartData, ChartOptions } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  import type { CountryStats } from '@/composables/useDataTransformation'

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const props = defineProps<{
    countryStats: CountryStats
  }>()

  const chartData = computed<ChartData<'bar'>>(() => ({
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
  }))

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 10,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Activities by Country',
        padding: {
          top: 10,
          bottom: 10
        },
        font: {
          size: 16,
          weight: 'bold'
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
    }
  }
</script>
