import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMessages {
  versionNative: string;
}

const initialState: IMessages = {
  versionNative: "",
};

export const messages = createSlice({
  name: "messages",
  initialState,
  reducers: {
    updateVersion: (state, { payload }: PayloadAction<string>) => {
      state.versionNative = payload;
    },
  },
  extraReducers: {},
});

export const { updateVersion } = messages.actions;

export default messages.reducer;
