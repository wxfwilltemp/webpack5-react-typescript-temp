/*
 * @Author: will
 * @Date: 2022-03-25 12:27:26
 * @LastEditTime: 2022-03-28 11:27:59
 * @LastEditors: will
 * @Description:
 */
import { createStore, combineReducers } from 'redux';

import userReducer from './reducers/userReducer';

// redux 持久化

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  userReducer,
});
const persistConfig = {
  key: 'servive-root',
  storage,
  whitelist: ['userReducer'],
};

const myPersistReducer = persistReducer(persistConfig, rootReducer);

const initialzeSate = {};

const store = createStore(myPersistReducer, initialzeSate);

export const persistor = persistStore(store);

export default store;
