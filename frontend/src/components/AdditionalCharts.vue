<template>
  <div class="grid gap-8">
    <!-- Activity Timeline -->
    <div class="bg-white rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-gray-900">Activity Timeline</h2>
      </div>
      <div class="p-6">
        <div class="h-[300px]">
          <Line :data="timelineData" :options="timelineOptions" />
        </div>
      </div>
    </div>

    <!-- Product Distribution Pie Chart -->
    <div class="bg-white rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-gray-900">Product Distribution</h2>
      </div>
      <div class="p-6">
        <div class="h-[400px]">
          <Pie :data="productData" :options="pieOptions" />
        </div>
      </div>
    </div>

    <!-- News Source Distribution -->
    <div class="bg-white rounded-lg border">
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-gray-900">Top News Sources</h2>
      </div>
      <div class="p-6">
        <div class="h-[300px]">
          <Bar :data="sourceData" :options="barOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import { Line, Bar, Pie } from 'vue-chartjs'
  import _ from 'lodash'

  // Register ChartJS components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  )

  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  })

  // Timeline Data
  const timelineData = computed(() => {
    const groupedByDate = _.groupBy(
      props.data,
      (item) => new Date(item.date).toISOString().split('T')[0]
    )

    const dates = Object.keys(groupedByDate).sort()
    const counts = dates.map((date) => groupedByDate[date].length)

    return {
      labels: dates.map((date) => new Date(date).toLocaleDateString()),
      datasets: [
        {
          label: 'Daily Activities',
          data: counts,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    }
  })

  // Product Distribution Data
  const productData = computed(() => {
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

  // News Source Distribution
  const sourceData = computed(() => {
    const sourceCounts = _.countBy(props.data, 'name')
    const sortedSources = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])

    return {
      labels: sortedSources.map(([source]) => source),
      datasets: [
        {
          label: 'Articles Published',
          data: sortedSources.map(([_, count]) => count),
          backgroundColor: 'rgba(54, 162, 235, 0.8)'
        }
      ]
    }
  })

  // Chart Options
  const timelineOptions = {
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
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  }

  const barOptions = {
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
  }
</script>
