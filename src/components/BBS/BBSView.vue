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
                            <span @click="download(view.id, file.id, fileInfo.id)" class="hover:underline cursor-pointer">
                                {{ fileInfo.filename }}
                            </span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    no file
                </div>
            </div>
        </div>
        <div class="flex justify-between">
            <div>
                <div v-if="failed" class="px-4 py-1 rounded border border-red-600 bg-red-200 text-red-700 shadow">
                    Fail to download - {{ message }}
                </div>
            </div>
            <div class="space-x-2">
                <router-link :to="{ name: 'bbs-list'}" class="border border-black hover:bg-black hover:text-white transition-colors rounded px-4 py-1">
                    List
                </router-link>
                <router-link :to="'/bbs/modify/' + view.id" class="border border-blue-800 bg-blue-500 hover:bg-blue-600 text-white transition-colors rounded px-4 py-1">
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
        const failed = ref(false)
        const message = ref('')

        onMounted(async () => {
            await axios
            .get(`http://public.flexink.com:9250/api/public/bbs/post/${route.params.id}`)
            .then(response => {
                view.value = response.data
            })
        })

        function download(id, file_id, fileInfo_id) {
            axios
            .get(`http://public.flexink.com:9250/api/public/bbs/post/file/${id}/${file_id}/${fileInfo_id}?lang=en`)
            .then(response => {
                message.value = response.data
            })
            .catch(error => {
                failed.value = true
                message.value = error.response.data.message
            })
            .finally(() => {
                setTimeout(function() {
                    failed.value = false
                }, 3000)
            })
        }

        return {
            view,
            failed,
            message,
            download
        }
    }
}
</script>
