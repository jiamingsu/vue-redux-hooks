<template>
  <div>
    <button @click="onPlusButtonClicked">+</button>
    <span>{{ count }}</span>
    <button @click="onMinusButtonClicked">-</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { increment, decrement } from './store';
import { useSelector, useDispatch } from '../lib';

const Counter = defineComponent({
  setup() {
    const dispatch = useDispatch();

    const onPlusButtonClicked = () => {
      dispatch(increment());
    };

    const onMinusButtonClicked = () => {
      dispatch(decrement());
    };

    const count = useSelector((state) => state.count);

    return {
      count,
      onPlusButtonClicked,
      onMinusButtonClicked,
    };
  },
});

export default Counter;
</script>
