import { provide, inject, ref, onBeforeUnmount } from '@vue/composition-api';
import { Store, Action, AnyAction } from 'redux';

const storeKey = Symbol('store');

class StoreNotProvidedError extends Error {
  constructor() {
    super();
    this.name = 'StoreNotProvidedError';
    this.message =
      'Store Not Provided. Please provide store by using useProvider(store) hook.';
  }
}

const refEquality = (a: any, b: any) => a === b;

/**
 * corresponding to Provider component in react-redux
 * https://react-redux.js.org/api/provider#provider
 */
export function useProvider<S = any, A extends Action<any> = AnyAction>(
  store: Store<S, A>
) {
  provide(storeKey, store);
}

/**
 * corresponding to useStore hook in react-redux
 * https://react-redux.js.org/api/hooks#usestore
 */
export function useStore<S = any, A extends Action<any> = AnyAction>() {
  const store = inject<Store<S, A>>(storeKey);
  if (!store) {
    throw new StoreNotProvidedError();
  }
  return store;
}

/**
 * corresponding to useSelector hook in react-redux
 * https://react-redux.js.org/api/hooks#useselector
 */
export function useSelector<S = any, A extends Action<any> = AnyAction>(
  selector: Function,
  equalityFn: Function = refEquality
) {
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
  });

  onBeforeUnmount(() => unsubscribe());
  return reactiveSelectedState;
}

/**
 * corresponding to useDispatch hook in react-redux
 * https://react-redux.js.org/api/hooks#usedispatch
 */
export function useDispatch<S = any, A extends Action<any> = AnyAction>() {
  const store = useStore<S, A>();
  const dispatch = (action: A) => {
    store.dispatch(action);
  };
  return dispatch;
}
