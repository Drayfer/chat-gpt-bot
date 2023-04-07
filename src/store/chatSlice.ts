import { Dialog } from "@/app/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDialogHistory, getChatSession } from "./requests/chat";

export type TModel = "gpt" | "startGpt" | "image";
export interface IDialog {
  message: string;
  answer: string;
  session: number;
  createdAt: Date;
  model: number;
}

export interface IChat {
  session: number;
  model: TModel;
  currentChat: Dialog[];
}

const initialState: IChat = {
  session: 0,
  model: "startGpt",
  currentChat: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateChatSession: (state, action: PayloadAction<number>) => {
      state.session = action.payload;
    },
    setModel: (state, action: PayloadAction<TModel>) => {
      state.model = action.payload;
    },
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
  extraReducers: {
    [fetchDialogHistory.fulfilled.type]: (
      state,
      action: PayloadAction<IDialog[]>
    ) => {
      const model: TModel = action.payload[0].model === 0 ? "gpt" : "image";
      state.model = model;
      state.session = action.payload[0].session;
      const dialog: Dialog[] = [];
      action.payload.forEach((item) => {
        dialog.push({ who: "me", text: item.message });
        dialog.push({ who: "bot", text: item.answer });
      });
      state.currentChat = dialog;
    },
    [getChatSession.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.session = action.payload;
    },
  },
});

export const {
  updateChatSession,
  setModel,
  clearMessages,
  addMessage,
  updateMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
