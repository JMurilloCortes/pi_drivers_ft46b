import { createStore } from 'redux';
import paginationReducer from './reducers/paginationReducer';

const store = createStore(paginationReducer);

export default store;
