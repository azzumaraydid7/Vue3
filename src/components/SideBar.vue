<template>
    <div class="space-y-4">
        <div v-for="(link, index) in links" :key="index">
            <button class="font-bold py-2 w-full border rounded flex items-center justify-center"
                @click="activeId = index">
                {{ link.menuName }}
            </button>
            <div class="overflow-hidden">
                <transition
                    enter-active-class="-translate-y-1/2 opacity-0 transform transition duration-500 ease-in-out"
                    enter-class="-translate-y-1/2 opacity-0"
                    enter-to-class="translate-y-0 opacity-100"
                    leave-active-class="transform transition duration-300 ease-in-out"
                    leave-class="translate-y-0 opacity-100"
                    leave-to-class="-translate-y-1/2 opacity-0"
                >
                    <ul
                    v-if="link.subMenus"
                    v-show="index === activeId"
                    class="space-y-1"
                    >
                        <li v-for="(submenu, index) in link.subMenus" :key="index">
                            <router-link :to="submenu.url" class="bg-black text-white border border-black block px-4 py-2 rounded hover:bg-slate-900 active:bg-gray-500 active:text-white transition-colors shadow">
                                {{ submenu.menuName }}
                            </router-link>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
        <div>
            <button class="font-bold py-2 w-full border rounded flex items-center justify-center"
                @click="activeId = index">
                Test
            </button>
            <div class="overflow-hidden">
                <transition
                    enter-active-class="-translate-y-1/2 opacity-0 transform transition duration-500 ease-in-out"
                    enter-class="-translate-y-1/2 opacity-0"
                    enter-to-class="translate-y-0 opacity-100"
                    leave-active-class="transform transition duration-300 ease-in-out"
                    leave-class="translate-y-0 opacity-100"
                    leave-to-class="-translate-y-1/2 opacity-0"
                >
                    <ul
                    v-show="true"
                    class="space-y-1"
                    >
                        <li>
                            <router-link :to="'/test'" class="bg-black text-white border border-black block px-4 py-2 rounded hover:bg-slate-900 active:bg-gray-500 active:text-white transition-colors shadow">
                                test
                            </router-link>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
    data() {
        return {
            activeId: null
        }
    },
    setup() {
        const links = ref([])
        onMounted(async () => {
            await axios
            .get('http://public.flexink.com:9250/api/public/menu/hierarchy')
            .then(response => {
                links.value = response.data
            })
            .catch(error => {
                console.log(error.response.message)
            })
        })
        return {
            links
        }
    },
}
</script>
<style scoped>
.router-link-active {
    color: black;
    background-color: aliceblue;
}
.router-link-active:hover {
    background-color: aliceblue;
}
</style>
