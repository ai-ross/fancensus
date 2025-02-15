<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Data Dashboard</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Error handling -->
      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded mb-4 font-medium"
      >
        {{ error }}
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8 text-gray-900 font-medium">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"
        ></div>
        Loading...
      </div>

      <div v-else class="grid gap-6">
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
      </div>

      <!-- Drill Down Modal -->
      <DrillDownModal :show="showModal" :items="selectedItems" @close="closeModal" />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import { fetchData, type DataItem } from '@/services/api'
  import useDataTransformation from '@/composables/useDataTransformation'
  import CountryTable from '@/components/CountryTable.vue'
  import ProductTable from '@/components/ProductTable.vue'
  import CountryChart from '@/components/CountryChart.vue'
  import DrillDownModal from '@/components/DrillDownModal.vue'
  import ActivityTimeline from '@/components/ActivityTimeline.vue'
  import ProductDistribution from '@/components/ProductDistribution.vue'
  import NewsSourceDistribution from '@/components/NewsSourceDistribution.vue'

  const loading = ref(true)
  const error = ref<string | null>(null)
  const showModal = ref(false)
  const selectedItems = ref<DataItem[]>([])

  const { rawData, groupedByCountry, groupedByProduct, countryStats, setData } =
    useDataTransformation()

  const latestUpdate = computed(() => {
    if (!rawData.value.length) return 'No data'
    const dates = rawData.value.map((item) => new Date(item.date).getTime())
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

  onMounted(async () => {
    try {
      const data = await fetchData()
      setData(data)
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to load data. Please try again later.'
    } finally {
      loading.value = false
    }
  })
</script>
