<template>
  <div>
    <header class="fixed z-10 bg-black text-white w-full">
      <div class="w-full px-6 mx-auto">
        <div class="py-4 flex justify-between">
          <div>
            <router-link :to="{ name: 'home'}" class="hover:text-black hover:bg-white transition-colors px-4 py-2 border-b-2">
              Home
            </router-link>
          </div>
            <button @click="side = !side">
              menu
            </button>
        </div>
      </div>
    </header>
    <div class="w-full px-6 py-20 mx-auto">
      <div class="flex space-x-1">
        <aside class="w-52 space-y-2 flex-shrink-0 fixed overflow-auto sm:relative bg-white h-full pr-6"  v-if="side">
          <SideBar></SideBar>
        </aside>
        <router-view class="w-full"></router-view>
      </div>
    </div>
    <footer class="fixed bottom-0 bg-black text-white w-full">
      <div class="w-full px-6 mx-auto">
        <div class="py-4">
          Footer
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import SideBar from "@/components/SideBar.vue"
import { ref } from 'vue'

export default {
  components: {
    SideBar
  },
  setup() {
    const side = ref(true)

    return {
      side
    }
  },
  mounted() {
    if(window.innerWidth < 640) {
      this.side = false
    }
  }
}
</script>