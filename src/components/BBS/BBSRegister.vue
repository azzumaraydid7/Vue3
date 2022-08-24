<template>
    <div class="overflow-hidden">
        <h2>
            BBS Register
        </h2>
        <form @submit.prevent="uploadFile()">
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
                    <div v-if="filePost">
                        <div v-for="(fileInfo, index) in filePost" :key="fileInfo.id" :id="'file_info_' + fileInfo.id" class="flex">
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
                    <div class="flex justify-between">
                        <input required type="file" ref="file" name="upload" id="upload" @change="onFileChange" class="border cursor-pointer">
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
                        Failed - {{ message }}
                    </div>
                </div>
                <button type="submit" class="float-right border border-emerald-700 bg-emerald-500 hover:bg-emerald-400 text-white transition-colors rounded px-4 py-1">
                    Save
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
    setup() {
        const success = ref(false)
        const failed = ref(false)
        const view = ref({
            title: '',
            content: ''
        })
        const label = ref('')
        const image = ref(null)
        const fileURL = ref(null)
        const submitName = ref('Success')
        const filePost = ref([])
        const message = ref('')

        function uploadFile() {
            const formData = new FormData();
            formData.append('file', image.value)

            const header = { 'content-type': 'multipart/form-data' }

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

        }

        function submit(value) {
            axios
            .post(`http://public.flexink.com:9250/api/public/bbs/post`, {
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

        return {
            success,
            failed,
            view,
            label,
            image,
            fileURL,
            submitName,
            submit,
            uploadFile,
            onFileChange,
            filePost,
            message
        }
    }
}
</script>