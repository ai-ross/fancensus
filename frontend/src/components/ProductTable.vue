<template>
    <div class="overflow-x-auto border rounded-lg">
      <table class="min-w-full">
        <thead>
          <tr class="border-b bg-gray-100">
            <th class="px-6 py-3 text-left text-gray-900 font-bold">Product</th>
            <th class="px-6 py-3 text-left text-gray-900 font-bold">Number of Activities</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="item in groupedData" :key="item.product" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 text-gray-900">{{ item.product }}</td>
            <td class="px-6 py-4 text-gray-900">{{ item.count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script setup>
  defineProps({
    groupedData: {
      type: Array,
      required: true
    }
  });
</script>