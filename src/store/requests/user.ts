import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IUser {
  paid: Date;
}

export const fetchUserData = createAsyncThunk("api/user", async (thunkAPI) => {
  try {
    const { data } = await axios<IUser>(`/api/user`);
    return data;
  } catch (err: any) {}
});
