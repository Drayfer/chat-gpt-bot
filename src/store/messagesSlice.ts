import { Dialog } from "@/app/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDialogHistory, getChatSession } from "./requests/chat";

interface IDialog {
  currentChat: Dialog[];
}

const initialState: IDialog = {
  currentChat: [],
};

export const messages = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.currentChat = [];
    },
    addMessage: (state, { payload }: PayloadAction<Dialog>) => {
      state.currentChat.push(payload);
    },
    updateMessages: (state, { payload }: PayloadAction<Dialog[]>) => {
      state.currentChat = payload;
    },
  },
  extraReducers: {},
});

export const { clearMessages, addMessage, updateMessages } = messages.actions;

export default messages.reducer;
