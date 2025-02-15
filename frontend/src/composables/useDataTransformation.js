import { ref, computed } from 'vue';

export default function useDataTransformation() {
  const rawData = ref([]);

  const groupedByCountry = computed(() => {
    const groups = {};
    rawData.value.forEach(item => {
      if (!groups[item.countrycode]) {
        groups[item.countrycode] = [];
      }
      groups[item.countrycode].push(item);
    });
    return groups;
  });

  const groupedByProduct = computed(() => {
    const groups = {};
    rawData.value.forEach(item => {
      if (!groups[item.product]) {
        groups[item.product] = [];
      }
      groups[item.product].push(item);
    });
    return Object.entries(groups).map(([product, items]) => ({
      product,
      count: items.length,
      items
    }));
  });

  const countryStats = computed(() => {
    const stats = {};
    rawData.value.forEach(item => {
      if (!stats[item.countrycode]) {
        stats[item.countrycode] = 0;
      }
      stats[item.countrycode]++;
    });
    return stats;
  });

  const setData = (data) => {
    rawData.value = data;
  };

  return {
    rawData,
    groupedByCountry,
    groupedByProduct,
    countryStats,
    setData
  };
}