<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1
          class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center sm:text-left"
        >
          Data Dashboard
        </h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Error handling -->
      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center font-medium"
      >
        {{ error }}
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-8">
        <div
          class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-gray-900 mb-4"
        ></div>
        <p class="text-gray-900 font-medium text-sm sm:text-base">Loading...</p>
      </div>

      <Dashboard
        v-else
        :raw-data="rawData"
        :grouped-by-country="groupedByCountry"
        :grouped-by-product="groupedByProduct"
        :country-stats="countryStats"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { fetchData } from '@/services/api'
  import useDataTransformation from '@/composables/useDataTransformation'
  import Dashboard from '@/components/Dashboard.vue'

  const loading = ref(true)
  const error = ref<string | null>(null)

  const { rawData, groupedByCountry, groupedByProduct, countryStats, setData } =
    useDataTransformation()

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
