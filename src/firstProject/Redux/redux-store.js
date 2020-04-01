import { applyMiddleware, createStore, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import dialogsReducer from './reducerDialogs';
import profileReduser from './reducerProfile';
import usersReduser from './reducerUsers';
import authReduser from './reducerAuth';
import appReduser from './reducerApp';


const reducers = combineReducers({
  dialogs: dialogsReducer,
  profile: profileReduser,
  app: appReduser,
  usersPage: usersReduser,
  auth: authReduser,
  form: formReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
