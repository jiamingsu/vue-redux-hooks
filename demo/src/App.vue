<template>
  <div id="app">
    <div>{{ counter }}</div>
    <button @click="dispatch({type: 'INCREMENT'})"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {defineComponent} from '@vue/composition-api';
import {useProvider, useDispatch, useSelector} from './hooks/vue-redux-hooks';
import store from './redux-store';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  setup: () => {
    useProvider(store);
    const dispatch = useDispatch();
    const counter = useSelector((state: number) => state);
    return {counter, dispatch}
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
