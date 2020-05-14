<template>
  <div id="app">
    <ol>
      <li v-for="todo in todos" :key="todo.id">{{todo.text}}</li>
    </ol>
    <button @click="dispatch(addTodo('test'))"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';
import { useProvider, useDispatch, useSelector } from './hooks/vue-redux-hooks';
import store from './redux-store';
import { addTodo } from './redux-store/actions';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  setup: () => {
    useProvider(store);
    const dispatch = useDispatch();
    const todos = useSelector((state: any) => state.todos);
    return { todos, dispatch, addTodo };
  },
});
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
