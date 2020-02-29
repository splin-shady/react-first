import {applyMiddleware, createStore, combineReducers} from 'redux';

import dialogsReducer from './reducerDialogs';
import profileReduser from './reducerProfile';
import usersReduser from './reducerUsers';
import authReduser from './reducerAuth';
import thunkMiddleware from 'redux-thunk';


let reducers = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReduser,
    usersPage: usersReduser,
    auth: authReduser
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;