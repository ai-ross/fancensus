<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    @click="$emit('close')"
  >
    <div class="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] flex flex-col" @click.stop>
      <!-- Fixed header -->
      <div
        class="flex justify-between items-center p-6 border-b bg-white rounded-t-lg sticky top-0"
      >
        <h2 class="text-xl font-bold text-gray-900">Country Details</h2>
        <button
          @click="$emit('close')"
          class="text-gray-700 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      <!-- Scrollable content -->
      <div class="p-6 overflow-y-auto">
        <div class="border rounded-lg overflow-hidden">
          <table class="min-w-full">
            <thead>
              <tr class="border-b bg-gray-100">
                <th class="px-4 py-2 text-left text-gray-900 font-bold sticky top-0 bg-gray-100">
                  Product
                </th>
                <th class="px-4 py-2 text-left text-gray-900 font-bold sticky top-0 bg-gray-100">
                  Date
                </th>
                <th class="px-4 py-2 text-left text-gray-900 font-bold sticky top-0 bg-gray-100">
                  Headline
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="item in items" :key="item.headline" class="border-b hover:bg-gray-50">
                <td class="px-4 py-2 text-gray-900">{{ item.product }}</td>
                <td class="px-4 py-2 text-gray-900">{{ formatDate(item.date) }}</td>
                <td class="px-4 py-2 text-gray-900">{{ item.headline }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    show: Boolean,
    items: Array
  })

  defineEmits(['close'])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }
</script>
