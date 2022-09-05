<template>
    <div>
        {{ store }}
        <div>
            <button @click="store.increment">
                +
            </button>
            <button @click="decrement()">
                -
            </button>
        </div>
    </div>
</template>
<script>
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const store = useCounterStore()

    function decrement() {
        store.counter--
    }

    return {
      // you can return the whole store instance to use it in the template
      store,
      decrement
    }
  },

}
</script>