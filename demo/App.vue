<template>
  <Counter />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Counter from './Counter.vue';
import store from './store';
import { useProvider } from '../lib';

const App = defineComponent({
  components: {
    Counter,
  },
  setup() {
    useProvider(store);
  },
});

export default App;
</script>
