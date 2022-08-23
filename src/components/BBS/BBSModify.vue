<template>
    <div>
        <h2>
            BBS Modify
        </h2>
        <form @submit.prevent="submit()">
            <div class="border grid grid-cols-4 gap-4 p-4 my-4">
                <div>
                    title
                </div>
                <div class="col-span-3 border p-2">
                    <input type="text" name="title" id="title" v-model="view.title" class="border border-black px-2 py-1">
                </div>
                <div>
                    content
                </div>
                <div class="col-span-3 border p-2">
                    <textarea class="border border-black px-2 py-1 w-full" rows="4" cols="50" v-model="view.content"></textarea>
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
                    <div>
                        <input type="file" name="file" id="file">
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <div>
                    <div v-if="success" class="px-4 py-1 rounded border border-green-600 bg-green-200 text-green-700 shadow">
                        Post deleted
                    </div>
                    <div v-if="failed" class="px-4 py-1 rounded border border-red-600 bg-red-200 text-red-700 shadow">
                        Failed
                    </div>
                </div>
                <div class="space-x-2">
                    <router-link :to="{ name: 'bbs-list'}" class="border border-black hover:bg-black hover:text-white transition-colors rounded px-4 py-1">
                        List
                    </router-link>
                    <button @click="deletePost()" :disabled="process" class="border border-black hover:bg-black hover:text-white transition-colors rounded px-4 py-1">
                        Delete
                    </button>
                    <button type="submit" :to="'/bbs/modify/' + view.id" class="border border-black hover:bg-black hover:text-white transition-colors rounded px-4 py-1">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
    setup() {
        const success = ref(false)
        const failed = ref(false)
        const process = ref(false)
        const view = ref([])
        const route = useRoute()

        onMounted(async () => {
            await axios
            .get(`http://public.flexink.com:9250/api/public/bbs/post/${route.params.id}`)
            .then(response => {
                view.value = response.data
            })
        })

        function submit() {
            axios
            .put(`http://public.flexink.com:9250/api/public/bbs/post/${route.params.id}`, {
                title: this.view.title,
                content: this.view.content
            })
            .then(response => {
                success.value = true
            })
            .catch(error => {
                failed.value = true
            })
            .finally(() => {
                setTimeout(function() {
                    success.value = false
                    failed.value = false
                }, 3000)
            })
        }

        function deletePost() {
            process.value = true
            axios
            .delete(`http://public.flexink.com:9250/api/public/bbs/post/${route.params.id}`, {
                title: this.view.title,
                content: this.view.content
            })
            .then(response => {
                success.value = true
            })
            .catch(error => {
                failed.value = true
            })
            .finally(() => {
                process.value = false
                setTimeout(function() {
                    success.value = false
                    failed.value = false
                }, 3000)
            })
        }

        return {
            success,
            failed,
            process,
            view,
            submit,
            deletePost
        }
    },
}
</script>
<style scoped>
button {
    line-height: normal;
}
</style>