<template>
    <div>
        <h2>
            BBS View - ID : {{ view.id }}
        </h2>
        <div class="border grid grid-cols-4 gap-4 p-4 my-4">
            <div>
                title
            </div>
            <div class="col-span-3 border p-2">
                {{ view.title }}
            </div>
            <div>
                content
            </div>
            <div class="col-span-3 border p-2">
                {{ view.content }}
            </div>
            <div>
                files
            </div>
            <div class="col-span-3 border p-2">
                <div v-if="view.attachedFile">
                    <div v-for="file in view" :key="file.id">
                        <div v-for="fileInfo in file.attachedFileInfos" :key="fileInfo.id">
                            {{ fileInfo.filename }}
                        </div>
                    </div>
                </div>
                <div v-else>
                    no file
                </div>
            </div>
        </div>
        <div>
            <div class="float-right space-x-2">
                <router-link :to="{ name: 'bbs-list'}" class="border border-black hover:bg-black hover:text-white transition-colors rounded px-4 py-1">
                    List
                </router-link>
                <router-link :to="'/bbs/modify/' + view.id" class="border border-black hover:bg-black hover:text-white transition-colors rounded px-4 py-1">
                    Modify
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
    setup() {
        const view = ref([])
        const route = useRoute()

        onMounted(async () => {
            await axios
            .get(`http://public.flexink.com:9250/api/public/bbs/post/${route.params.id}`)
            .then(response => {
                view.value = response.data
            })
        })
        return {
            view
        }
    }
}
</script>