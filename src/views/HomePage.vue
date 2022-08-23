<template>
    <div>
        <div v-for="(data, index) in data.info" :key="index">
            {{ data }}
        </div>
        <div v-for="(item, index) in data.item" :key="index">
            <div>
                {{ item.name }}
            </div>
            <div>
                {{ item.request.method }}
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