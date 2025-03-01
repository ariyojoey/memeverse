import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemeType } from "../profile/types";

interface LeaderboardState {
  topMemes: MemeType[];
}

const initialState: LeaderboardState = {
  topMemes: [],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    updateLeaderboard: (state, action: PayloadAction<MemeType[]>) => {
      state.topMemes = action.payload;
    },
  },
});

export const { updateLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
