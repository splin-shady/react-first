const ADD_MESSAGE = 'ADD_MESSAGE';

type dialogItemDataType = {
  id: number
  name: string
}

type dialogMessagesType = {
  id: number
  mess: string
}

const initialState = {
  dialogItemData: [
    { id: 1, name: 'Sena' },
  ] as Array<dialogItemDataType>,
  dialogMessages: [
    { id: 1, mess: 'dddd' },
  ] as Array<dialogMessagesType>,
  newTextMessage: '',
};

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateType => {
  let newState;
  switch (action.type) {
    case ADD_MESSAGE:
      newState = {
        ...state,
        dialogMessages: [...state.dialogMessages, { id: 8, mess: action.newTextMessage }],
      };
      return newState;
    default: return state;
  }
};

type addMessageCreatorType = {
  type: typeof ADD_MESSAGE
  newTextMessage: string
}

export const addMessageCreator = (newTextMessage: string): addMessageCreatorType => ({ type: ADD_MESSAGE, newTextMessage });

export default dialogsReducer;
