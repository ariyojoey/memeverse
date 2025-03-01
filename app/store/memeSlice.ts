import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemeType } from "app/profile/types";

interface MemesState {
  memes: MemeType[];
  loading: boolean;
}

const initialState: MemesState = {
  memes: [],
  loading: false,
};

const memesSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setMemes: (state, action: PayloadAction<MemeType[]>) => {
      state.memes = action.payload;
    },
  },
});

export const { setMemes } = memesSlice.actions;
export default memesSlice.reducer;
