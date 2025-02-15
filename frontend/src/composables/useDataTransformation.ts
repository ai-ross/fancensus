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

  const groupedByCountry = computed<{ [key: string]: DataItem[] }>(() => {
    return rawData.value.reduce((groups, item) => {
      const countryCode = item.countrycode
      if (!groups[countryCode]) {
        groups[countryCode] = []
      }
      groups[countryCode].push(item)
      return groups
    }, {} as { [key: string]: DataItem[] })
  })

  const groupedByProduct = computed<GroupedByProduct[]>(() => {
    const groups = rawData.value.reduce((acc, item) => {
      if (!acc[item.product]) {
        acc[item.product] = { 
          product: item.product, 
          count: 0, 
          items: [] 
        }
      }
      acc[item.product].count++
      acc[item.product].items.push(item)
      return acc
    }, {} as { [key: string]: GroupedByProduct })

    return Object.values(groups).sort((a, b) => b.count - a.count)
  })

  const countryStats = computed<CountryStats>(() => {
    return rawData.value.reduce((stats, item) => {
      stats[item.countrycode] = (stats[item.countrycode] || 0) + 1
      return stats
    }, {} as CountryStats)
  })

  const latestUpdate = computed<string>(() => {
    if (rawData.value.length === 0) return 'No data'
    
    const dates = rawData.value.map(item => new Date(item.date).getTime())
    const latest = new Date(Math.max(...dates))
    return latest.toLocaleDateString()
  })

  const setData = (data: DataItem[]) => {
    rawData.value = data
  }

  const clearData = () => {
    rawData.value = []
  }

  return {
    rawData,
    groupedByCountry,
    groupedByProduct,
    countryStats,
    latestUpdate,
    setData,
    clearData
  }
}