import { Dialog } from "@/app/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDialogHistory, getChatSession } from "./requests/chat";

interface IDialog {
  currentChat: Dialog[];
  versionNative: string;
}

const initialState: IDialog = {
  currentChat: [],
  versionNative: "",
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
    updateVersion: (state, { payload }: PayloadAction<string>) => {
      state.versionNative = payload;
    },
  },
  extraReducers: {},
});

export const { clearMessages, addMessage, updateMessages, updateVersion } =
  messages.actions;

export default messages.reducer;
