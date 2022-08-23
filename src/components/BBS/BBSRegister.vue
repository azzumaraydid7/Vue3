<template>
    <div class="overflow-hidden">
        <h2>
            BBS Register
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
                <div class="col-span-3 border">
                    <input type="file" name="file">
                </div>
            </div>
            <div class="flex justify-between">
                <div>
                    <div v-if="success" class="px-4 py-1 rounded border border-green-600 bg-green-200 text-green-700 shadow">
                        Success
                    </div>
                    <div v-if="failed" class="px-4 py-1 rounded border border-red-600 bg-red-200 text-red-700 shadow">
                        Failed
                    </div>
                </div>
                <button type="submit" class="float-right border border-black hover:bg-black hover:text-white transition-colors rounded px-4 py-1">
                    Save
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const success = ref(false)
        const failed = ref(false)
        const view = ref({
            title: '',
            content: ''
        })

        function submit() {
            axios
            .post(`http://public.flexink.com:9250/api/public/bbs/post`, {
                title: view.value.title,
                content: view.value.content,
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

        return {
            success,
            failed,
            view,
            submit
        }
    }
}
</script>