import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemeType } from "app/profile/types";

interface UserState {
  name: string;
  bio: string;
  profilePicture: string;
  uploadedMemes: MemeType[];
  likedMemes: string[];
}

const initialState: UserState = {
  name: "MemeMaster",
  bio: "Just a meme enthusiast 🤣",
  profilePicture: "/default-avatar.png",
  uploadedMemes: [],
  likedMemes: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<{ name: string; bio: string; profilePicture: string }>) => {
      state.name = action.payload.name;
      state.bio = action.payload.bio;
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
