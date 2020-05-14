import { createStore, combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
});

const store = createStore(rootReducer);

export default store;
