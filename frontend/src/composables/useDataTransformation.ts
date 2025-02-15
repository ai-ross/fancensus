import { ref, computed } from 'vue'
import type { DataItem } from '@/services/api'

export interface GroupedByProduct {
  product: string
  count: number
  items: DataItem[]
}

export interface CountryStats {
  [key: string]: number
}

export default function useDataTransformation() {
  const rawData = ref<DataItem[]>([])

  const groupedByCountry = computed(() => {
    const groups: { [key: string]: DataItem[] } = {}
    rawData.value.forEach((item) => {
      if (!groups[item.countrycode]) {
        groups[item.countrycode] = []
      }
      groups[item.countrycode].push(item)
    })
    return groups
  })

  const groupedByProduct = computed(() => {
    const groups: { [key: string]: DataItem[] } = {}
    rawData.value.forEach((item) => {
      if (!groups[item.product]) {
        groups[item.product] = []
      }
      groups[item.product].push(item)
    })
    return Object.entries(groups).map(([product, items]) => ({
      product,
      count: items.length,
      items
    }))
  })

  const countryStats = computed(() => {
    const stats: CountryStats = {}
    rawData.value.forEach((item) => {
      if (!stats[item.countrycode]) {
        stats[item.countrycode] = 0
      }
      stats[item.countrycode]++
    })
    return stats
  })

  const setData = (data: DataItem[]) => {
    rawData.value = data
  }

  return {
    rawData,
    groupedByCountry,
    groupedByProduct,
    countryStats,
    setData
  }
}
