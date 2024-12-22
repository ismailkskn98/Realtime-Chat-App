import { PayloadAction } from "./../../../../node_modules/@reduxjs/toolkit/src/createAction";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    objectImage: boolean;
    color: number;
    profileSetup: boolean;
  };
}

export const initialState: AuthState = {
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    objectImage: false,
    color: 0,
    profileSetup: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
