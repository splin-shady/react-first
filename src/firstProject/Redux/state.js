import dialogsReducer from './reducerDialogs'
import headerReduser from './reducerHeader'
import deletePostReduser from './reducerDeletePost'

let store = {

  _data : {
    dialogs : {
      dialogItemData : [
        {id :'1', name: 'Sena'},
        {id :'2', name: 'Tatuan'},
        {id :'3', name: 'NASTIA'},
        {id :'4', name: 'Malaya'},
        {id :'5', name: 'Tatuan'}
      ],
      dialogMessages : [
        {id :'1', mess: 'dddd'},
        {id :'2', mess: 'ff'},
        {id :'3', mess: 'NASTIAAAAAAAAAAAAA'},
        {id :'4', mess: 'gg'},
        {id :'5', mess: 'Tatuan'},
        {id :'6', mess: 'sse'},
        {id :'7', mess: 'ww'},
        {id :'8', mess: 'rr'}
      ],
      newTextMessage : ''
    },    
    profile : {
      post : [
        {id : '1', postMess : 'привет крошка'},
        {id : '2', postMess : 'иди учи экзамен)))'},
        {id : '3', postMess : 'как тебя зовут?'},
        {id : '4', postMess : 'go sex'}
      ],
      newTextPost : ''
    } 
  },
  _renderTree() {},
  
  getData() {
    return this._data;
  },
  subscribe(observer) {
    this._renderTree = observer;
  },


    dispatch(action) {
      this._data.profile = deletePostReduser(this._data.profile, action);
      this._data.dialogs = dialogsReducer(this._data.dialogs, action);
      this._data.profile = headerReduser(this._data.profile, action);
      return this._renderTree();
  }
}

export default store;