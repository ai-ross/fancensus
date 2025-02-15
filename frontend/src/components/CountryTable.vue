<template>
  <div class="overflow-x-auto border rounded-lg">
    <table class="min-w-full">
      <thead>
        <tr class="border-b bg-gray-100">
          <th class="px-6 py-3 text-left text-gray-900 font-bold">Country</th>
          <th class="px-6 py-3 text-left text-gray-900 font-bold">Activities</th>
          <th class="px-6 py-3 text-left text-gray-900 font-bold">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="(items, country) in groupedData"
          :key="country"
          class="border-b hover:bg-gray-50"
        >
          <td class="px-6 py-4 text-gray-900">{{ country }}</td>
          <td class="px-6 py-4 text-gray-900">{{ items.length }}</td>
          <td class="px-6 py-4">
            <button
              @click="$emit('show-details', items)"
              class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors font-medium"
            >
              View Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import type { DataItem } from '@/services/api'

  interface GroupedData {
    [key: string]: DataItem[]
  }

  defineProps<{
    groupedData: GroupedData
  }>()

  defineEmits<{
    'show-details': [items: DataItem[]]
  }>()
</script>
