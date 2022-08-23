<template>
    <div class="space-y-2 overflow-auto">
        <div v-for="(data, key) in data.info" :key="key">
            <span class="font-bold">
              {{ key }}
            </span>
             - {{ data }}
        </div>
        <div v-for="(item, index) in data.item" :key="index">
          <div class="flex space-x-4">
            <div class="border flex justify-center py-2 w-24">
              <code>
                {{ item.request.method }}
              </code>
            </div>
            <div class="border px-4 py-2 tracking-wide">
                {{ item.name }}
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import jsonData from "@/assets/json/test-site-restful-request.postman_collection"

export default {
  setup() {
    return {
      data: jsonData
    }
  }
}
</script>