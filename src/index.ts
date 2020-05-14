import { provide, inject, ref, onBeforeUnmount } from 'vue';
import { Store, Action, AnyAction } from 'redux';

const StoreSymbol = Symbol();
const listeners = [];

export function useProvider<S = any, A extends Action<any> = AnyAction>(store: Store<S, A>) {
  provide(StoreSymbol, store)
}

export function useStore<S = any, A extends Action<any> = AnyAction>() {
  return inject<Store<S, A>>(StoreSymbol)
}

export function useSelector<S = any, A extends Action<any> = AnyAction>(selector: Function, equalityFn?: Function) {
  const store = useStore<S, A>();
  const selectedState = selector(store.getState());
  const reactiveSelectedState = ref(selectedState)
  const unsubscribe = store.subscribe(() => {
    reactiveSelectedState.value = selector(store.getState());
  })
  onBeforeUnmount(() => unsubscribe());
  return reactiveSelectedState
}

export function useDispatch<S = any, A extends Action<any> = AnyAction>() {
  const store = useStore<S, A>();
  const dispatch =  (action: A) => {
    store.dispatch(action);
  }
  return dispatch
}