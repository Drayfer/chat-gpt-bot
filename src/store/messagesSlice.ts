import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserData, IUser } from "./requests/user";

interface IMessages {
  versionNative: string;
  paid: Date | null;
  loading: boolean;
}

const initialState: IMessages = {
  versionNative: "",
  paid: null,
  loading: false,
};

export const messages = createSlice({
  name: "messages",
  initialState,
  reducers: {
    updateVersion: (state, { payload }: PayloadAction<string>) => {
      state.versionNative = payload;
    },
  },
  extraReducers: {
    [fetchUserData.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IUser>
    ) => {
      state.paid = payload.paid;
      state.loading = false;
    },
    [fetchUserData.pending.type]: (
      state,
      { payload }: PayloadAction<IUser>
    ) => {
      state.loading = true;
    },
  },
});

export const { updateVersion } = messages.actions;

export default messages.reducer;
