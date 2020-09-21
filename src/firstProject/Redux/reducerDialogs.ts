import { dialogsApi } from '../api/api';
import { photosType } from '../types/types';

const ADD_MESSAGE = 'ADD_MESSAGE';
const GET_DIALOG_ITEM_DATA = 'GET_DIALOG_ITEM_DATA'
const GET_MESSAGES = 'GET_MESSAGES'

type dialogItemDataType = {
  id: number
  userName: string
  hasNewMessages: boolean
  lastDialogActivityDate: string
  lastUserActivityDate: string
  newMessagesCount: number
  photos: photosType
}

type dialogMessagesType = {
  items: []
  totalCount: number
  error: null  
}

const initialState = {
  dialogItemData: [] as Array<dialogItemDataType>,

  dialogMessages: [] as Array<dialogMessagesType>,
  
  newTextMessage: '',
};

export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateType => {
  let newState;
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state
      }
    case GET_DIALOG_ITEM_DATA:
      return {
        ...state,
        dialogItemData: [...action.dialogItems],        
      }
    default: return state;
  }
};

type addMessageCreatorType = {
  type: typeof ADD_MESSAGE
  newTextMessage: string
}
export const addMessageCreator = (newTextMessage: string): addMessageCreatorType => ({ type: ADD_MESSAGE, newTextMessage });

type dialogItemDataACType = {
  type: typeof GET_DIALOG_ITEM_DATA
  dialogItems: dialogItemDataType
}
export const dialogItemDataAC = (dialogItems: dialogItemDataType): dialogItemDataACType => ({ type: GET_DIALOG_ITEM_DATA, dialogItems });

type getMessagesACType = {
  type: typeof GET_MESSAGES
  messages: dialogMessagesType
}
export const getMessagesAC = (messages: dialogMessagesType) :getMessagesACType => ({ type: GET_MESSAGES, messages });

export const getAllDialogs = () => (dispatch: any) => {
  dialogsApi.getAllDialogs().then((response: any) => {
    dispatch(dialogItemDataAC(response.data))
  });
};

export const getMessages = (userId: number) => (dispatch: any) => {
  dialogsApi.getMessages(userId).then((response: any) => {
    console.log(response)
    dispatch(getMessagesAC(response.data))
  });
};

export const sendMessage = (userId: number, message: string) => (dispatch: any) => {
  console.log(userId +' ' + message)
  dialogsApi.sendMessage(userId, message).then((response: any) => {
    console.log(response)
  });
};

export default dialogsReducer;
