<template>
    <div>
        <h2>
            BBS List - Count : {{ lists.count }}
        </h2>
        <div class="max-w-7xl mx-auto">
            <div class="inline-block min-w-full py-2 align-middle">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    No
                                </th>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 w-full">
                                    Title
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Views
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="list in lists.data" :key="list.id">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6 flex justify-center">
                                    {{ list.id }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-blue-500">
                                    <router-link :to="'/bbs/view/' + list.id">
                                        {{ list.title }}
                                    </router-link>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm flex justify-center">
                                    {{ list.views }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                Page 1 of 1
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const lists = ref([])
        onMounted(async () => {
            await axios
            .get('http://public.flexink.com:9250/api/public/bbs/post')
            .then(response => {
                lists.value = response.data
            })
        })
        return {
            lists
        }
    }
}
</script>