import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDialogHistory, getChatSession } from "./requests/chat";

import type { AppState, AppThunk } from "./store";

interface IDialog {
  message: string;
  answer: string;
  session: number;
  createdAt: Date;
}

export interface IChat {
  dialog: IDialog[];
  session: number;
}

const initialState: IChat = {
  dialog: [],
  session: 0,
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
  },
  extraReducers: {
    [fetchDialogHistory.fulfilled.type]: (
      state,
      action: PayloadAction<IDialog[]>
    ) => {
      state.dialog = action.payload;
    },
    [getChatSession.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.session = action.payload;
    },
  },
});

export const { resetDialog, updateChatSession } = chatSlice.actions;

export default chatSlice.reducer;
