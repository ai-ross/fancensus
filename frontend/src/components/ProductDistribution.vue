<template>
  <div class="bg-white rounded-lg border">
    <div class="p-6 border-b">
      <h2 class="text-xl font-bold text-gray-900">Product Distribution</h2>
    </div>
    <div class="p-6">
      <div class="h-[400px]">
        <Pie :data="chartData" :options="options" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  import _ from 'lodash'

  ChartJS.register(ArcElement, Tooltip, Legend)

  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  })

  const chartData = computed(() => {
    const productCounts = _.countBy(props.data, 'product')
    const sortedProducts = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8) // Top 8 products

    return {
      labels: sortedProducts.map(([product]) => product),
      datasets: [
        {
          data: sortedProducts.map(([_, count]) => count),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#36A2EB'
          ]
        }
      ]
    }
  })

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  }
</script>
