const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_TEXT_MESSAGE = 'UPDATE_TEXT_MESSAGE';

let initialState = {
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
  }

const dialogsReducer = (state = initialState, action) =>{
    let newState; 
    switch (action.type){
        case ADD_MESSAGE:
            newState = { 
              ...state,
              dialogMessages: [...state.dialogMessages, {id : 8, mess : action.newTextMessage}]
            }
            return newState;
        default: return state;    
    }
}

export const addMessageCreator = (newTextMessage) => ({type: ADD_MESSAGE, newTextMessage});

export default dialogsReducer;