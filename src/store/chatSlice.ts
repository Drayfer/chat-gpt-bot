import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDialogHistory, getChatSession } from "./requests/chat";

export type TModel = "gpt" | "image";
export interface IDialog {
  message: string;
  answer: string;
  session: number;
  createdAt: Date;
  model: number;
}

export interface IChat {
  dialog: IDialog[];
  session: number;
  model: TModel;
}

const initialState: IChat = {
  dialog: [],
  session: 0,
  model: "gpt",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetDialog: (state) => {
      state.dialog = [];
    },
    updateChatSession: (state, action: PayloadAction<number>) => {
      state.session = action.payload;
    },
    setModel: (state, action: PayloadAction<TModel>) => {
      state.model = action.payload;
    },
  },
  extraReducers: {
    [fetchDialogHistory.fulfilled.type]: (
      state,
      action: PayloadAction<IDialog[]>
    ) => {
      const model: TModel = action.payload[0].model === 0 ? "gpt" : "image";
      state.model = model;
      state.dialog = action.payload;
    },
    [getChatSession.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.session = action.payload;
    },
  },
});

export const { resetDialog, updateChatSession, setModel } = chatSlice.actions;

export default chatSlice.reducer;
