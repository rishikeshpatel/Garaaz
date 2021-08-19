import { createStore, applyMiddleware } from 'redux';
import userFilterReducer from '../reducer/reducer';
import thunk from 'redux-thunk';

const store = createStore(userFilterReducer, applyMiddleware(thunk));

export default store;
