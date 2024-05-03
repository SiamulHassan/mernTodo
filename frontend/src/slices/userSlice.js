import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "login",
  initialState: {
    value: null,
  },
  reducers: {
    loggedInUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loggedInUser } = userSlice.actions;

export default userSlice.reducer;
