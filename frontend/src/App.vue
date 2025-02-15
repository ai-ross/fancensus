<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-gray-900">Data Dashboard</h1>
      
      <!-- Error handling -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded mb-4 font-medium">
        {{ error }}
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8 text-gray-900 font-medium">
        Loading...
      </div>

      <div v-else class="grid gap-8">
        <!-- Country Table -->
        <div class="bg-white rounded-lg border">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-gray-900">Activities by Country</h2>
          </div>
          <CountryTable 
            :groupedData="groupedByCountry"
            @show-details="showDrillDown"
          />
        </div>

        <!-- Product Table -->
        <div class="bg-white rounded-lg border">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-gray-900">Activities by Product</h2>
          </div>
          <ProductTable :groupedData="groupedByProduct" />
        </div>

        <!-- Country Distribution Chart -->
        <CountryChart :countryStats="countryStats" />

        <!-- Additional Visualizations -->
        <ActivityTimeline :data="rawData" />
        <ProductDistribution :data="rawData" />
        <NewsSourceDistribution :data="rawData" />
      </div>

      <!-- Drill Down Modal -->
      <DrillDownModal
        :show="showModal"
        :items="selectedItems"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { fetchData } from './services/api';
  import useDataTransformation from './composables/useDataTransformation';
  import CountryTable from './components/CountryTable.vue';
  import ProductTable from './components/ProductTable.vue';
  import CountryChart from './components/CountryChart.vue';
  import DrillDownModal from './components/DrillDownModal.vue';
  import ActivityTimeline from './components/ActivityTimeline.vue';
  import ProductDistribution from './components/ProductDistribution.vue';
  import NewsSourceDistribution from './components/NewsSourceDistribution.vue';

  const loading = ref(true);
  const error = ref(null);
  const showModal = ref(false);
  const selectedItems = ref([]);

  const {
    rawData,
    groupedByCountry,
    groupedByProduct,
    countryStats,
    setData
  } = useDataTransformation();

  const showDrillDown = (items) => {
    selectedItems.value = items;
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
    selectedItems.value = [];
  };

  onMounted(async () => {
    try {
      const data = await fetchData();
      setData(data);
    } catch (err) {
      error.value = 'Failed to load data. Please try again later.';
    } finally {
      loading.value = false;
    }
  });
</script>