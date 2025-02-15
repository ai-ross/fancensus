<template>
  <div class="grid gap-6">
    <!-- Overview Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500">Total Countries</h3>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ Object.keys(groupedByCountry).length }}
        </p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500">Total Products</h3>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ Object.keys(groupedByProduct).length }}
        </p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500">Total Activities</h3>
        <p class="mt-2 text-3xl font-bold text-gray-900">{{ rawData.length }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500">Latest Update</h3>
        <p class="mt-2 text-xl font-bold text-gray-900">
          {{ latestUpdate }}
        </p>
      </div>
    </div>

    <!-- Timeline Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ActivityTimeline :data="rawData" class="bg-white rounded-lg shadow" />

      <!-- Product Distribution -->
      <ProductDistribution :data="rawData" class="bg-white rounded-lg shadow" />
    </div>

    <!-- Tables Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Country Table -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-lg font-bold text-gray-900">Activities by Country</h2>
        </div>
        <CountryTable :groupedData="groupedByCountry" @show-details="showDrillDown" />
      </div>

      <!-- Product Table -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-lg font-bold text-gray-900">Activities by Product</h2>
        </div>
        <ProductTable :groupedData="groupedByProduct" />
      </div>
    </div>

    <!-- Full Width Charts -->
    <div class="grid grid-cols-1 gap-6">
      <!-- Country Distribution -->
      <CountryChart :countryStats="countryStats" class="bg-white rounded-lg shadow" />

      <!-- News Source Distribution -->
      <NewsSourceDistribution :data="rawData" class="bg-white rounded-lg shadow" />
    </div>

    <!-- Drill Down Modal -->
    <DrillDownModal :show="showModal" :items="selectedItems" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { DataItem } from '@/services/api'
  import CountryTable from '@/components/CountryTable.vue'
  import ProductTable from '@/components/ProductTable.vue'
  import CountryChart from '@/components/CountryChart.vue'
  import DrillDownModal from '@/components/DrillDownModal.vue'
  import ActivityTimeline from '@/components/ActivityTimeline.vue'
  import ProductDistribution from '@/components/ProductDistribution.vue'
  import NewsSourceDistribution from '@/components/NewsSourceDistribution.vue'

  const props = defineProps<{
    rawData: DataItem[]
    groupedByCountry: { [key: string]: DataItem[] }
    groupedByProduct: { product: string; count: number; items: DataItem[] }[]
    countryStats: { [key: string]: number }
  }>()

  const showModal = ref(false)
  const selectedItems = ref<DataItem[]>([])

  const latestUpdate = computed(() => {
    if (!props.rawData.length) return 'No data'
    const dates = props.rawData.map((item) => new Date(item.date).getTime())
    const latest = new Date(Math.max(...dates))
    return latest.toLocaleDateString()
  })

  const showDrillDown = (items: DataItem[]) => {
    selectedItems.value = items
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    selectedItems.value = []
  }
</script>
