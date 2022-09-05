<template>
    <div>
        <h1 class="font-bold">
            Test
        </h1>
        <CounterStore></CounterStore>
        <router-view></router-view>
    </div>
</template>
<script>
import CounterStore from '../../components/test/CounterStore.vue'
export default {
    components: {
        CounterStore
    }
}
</script>