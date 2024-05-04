import { configureStore } from "@reduxjs/toolkit";
import loggedInUser from "../slices/userSlice";
export default configureStore({
  reducer: {
    login: loggedInUser,
  },
});
