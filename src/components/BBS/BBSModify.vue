<template>
    <div>
        <h2>
            BBS Modify
        </h2>
        <form @submit.prevent="uploadFile()" :id="'post_' + postId">
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
                        <div v-for="(fileInfo, index) in view.attachedFile.attachedFileInfos" :key="fileInfo.id" :id="'file_info_' + fileInfo.id" class="flex">
                            <div class="flex space-x-3 border px-4 py-1">
                                <span>
                                    {{ fileInfo.filename }}
                                </span>
                                <span @click="deleteFile(index, view.attachedFile.id, fileInfo.id)" class="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pt-2">
                        <input type="file" ref="file" name="upload" id="upload" @change="onFileChange" class="border cursor-pointer">
                    </div>
                    <div id="preview" class="pt-4">
                        <img v-if="fileURL" :src="fileURL" class="object-cover h-40 w-40"/>
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <div>
                    <div v-if="success" class="px-4 py-1 rounded border border-green-600 bg-green-200 text-green-700 shadow">
                        {{ submitName }}
                    </div>
                    <div v-if="failed" class="px-4 py-1 rounded border border-red-600 bg-red-200 text-red-700 shadow">
                        Failed
                    </div>
                </div>
                <div class="space-x-2">
                    <router-link :to="{ name: 'bbs-list'}" class="border border-black hover:bg-black hover:text-white transition-colors rounded px-4 py-1">
                        List
                    </router-link>
                    <button @click="deletePost()" :disabled="process" class="border border-red-900 bg-red-600 hover:bg-red-500 text-white transition-colors rounded px-4 py-1">
                        Delete
                    </button>
                    <button type="submit" :to="'/bbs/modify/' + view.id" class="border border-emerald-700 bg-emerald-500 hover:bg-emerald-400 text-white transition-colors rounded px-4 py-1">
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
        const route = useRoute()
        const postId = ref(route.params.id)
        const success = ref(false)
        const failed = ref(false)
        const process = ref(false)
        const submitName = ref('Success')
        const label = ref('')
        const image = ref(null)
        const fileURL = ref(null)
        const view = ref({
            title: '',
            content: ''
        })
        const filePost = ref([])
        const message = ref('')

        onMounted(async () => {
            await axios
            .get(`http://public.flexink.com:9250/api/public/bbs/post/${route.params.id}`)
            .then(response => {
                view.value = response.data
                filePost.value = response.data.attachedFile.attachedFileInfos
            })
        })

        function uploadFile() {
            const formData = new FormData();
            formData.append('file', image.value)

            const header = { 'content-type': 'multipart/form-data' }

            if(image.value) {
                axios.post('http://public.flexink.com:9250/api/public/bbs/post/file', formData, { headers: header }
                ).then(response => {
                    submitName.value = 'File Uploaded'
                    success.value = true
                    label.value = response.data

                    label.value.forEach(element => {
                        filePost.value.push({
                            "filename" : element.originalFilename
                        })
                    });

                    this.submit(label.value)
                })
                .catch(function(){
                    failed.value = true
                })
                .finally(() => {
                    setTimeout(function() {
                        success.value = false
                        failed.value = false
                    }, 3000)
                })
            } else {
                this.submit()
            }
        }

        function submit(value) {
            axios
            .put(`http://public.flexink.com:9250/api/public/bbs/post/${route.params.id}`, {
                title: view.value.title,
                content: view.value.content,
                attachedFile: {
                    attachedFileInfos: value
                }
            })
            .then(response => {
                submitName.value = 'Saved'
                success.value = true
            })
            .catch(error => {
                message.value = error.response.data
                failed.value = true
            })
            .finally(() => {
                setTimeout(function() {
                    success.value = false
                    failed.value = false
                }, 3000)
            })
        }

        function onFileChange(e) {
            const file = e.target.files[0]
            image.value = file
            fileURL.value = URL.createObjectURL(file)
        }

        function deletePost() {
            process.value = true
            axios
            .delete(`http://public.flexink.com:9250/api/public/bbs/post/${route.params.id}`, {
                title: this.view.title,
                content: this.view.content
            })
            .then(response => {
                submitName.value = 'Post deleted'
                success.value = true
                const post_id = document.getElementById("post_" + postId.value)
                post_id.style.display = "none"
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

        function deleteFile(index, file_id, fileInfo_id) {
            process.value = true
            axios
            .delete(`http://public.flexink.com:9250/api/public/bbs/post/file/${route.params.id}/${file_id}/${fileInfo_id}`, {
                title: this.view.title,
                content: this.view.content
            })
            .then(response => {
                submitName.value = 'File deleted'
                success.value = true

                // const files = filePost.value
                // filePost.value = files.splice(index)

                const file_info_id = document.getElementById("file_info_" + fileInfo_id)
                file_info_id.style.display = "none"
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
            postId,
            success,
            failed,
            process,
            submitName,
            view,
            label,
            image,
            fileURL,
            submit,
            uploadFile,
            onFileChange,
            deletePost,
            deleteFile,
            filePost,
            message
        }
    },
}
</script>
<style scoped>
button {
    line-height: normal;
}
</style>