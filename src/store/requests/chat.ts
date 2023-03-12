import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDialogHistory = createAsyncThunk(
  "api/history/:id",
  async (payload: number, thunkAPI) => {
    try {
      const data = await fetch(`/api/history/${payload}`)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
      return data;
    } catch (err: any) {}
  }
);

export const getChatSession = createAsyncThunk("api/ai", async (thunkAPI) => {
  try {
    const { chatSession }: { chatSession: number } = await fetch(
      "/api/ai"
    ).then((res) => res.json());
    return chatSession;
  } catch (err: any) {}
});
