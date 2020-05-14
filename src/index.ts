import { provide, inject, ref, onBeforeUnmount } from 'vue';
import { Store, Action, AnyAction } from 'redux';

const storeKey = 'store';

export function useProvider<S = any, A extends Action<any> = AnyAction>(store: Store<S, A>) {
  provide(storeKey, store);
}

export function useStore<S = any, A extends Action<any> = AnyAction>() {
  return inject<Store<S, A>>(storeKey);
}

export function useSelector<S = any, A extends Action<any> = AnyAction>(selector: Function, equalityFn?: Function) {
  const store = useStore<S, A>();
  let selectedState = selector(store.getState());
  const reactiveSelectedState = ref(selectedState);
  const unsubscribe = store.subscribe(() => {
    const newSelectedState = selector(store.getState());
    if (equalityFn && equalityFn(selectedState, newSelectedState)) {
      return;
    }
    selectedState = newSelectedState;
    reactiveSelectedState.value = selectedState;
  })
  onBeforeUnmount(() => unsubscribe());
  return reactiveSelectedState;
}

export function useDispatch<S = any, A extends Action<any> = AnyAction>() {
  const store = useStore<S, A>();
  const dispatch = (action: A) => {
    store.dispatch(action);
  }
  return dispatch;
}