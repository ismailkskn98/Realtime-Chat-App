import { PayloadAction } from "./../../../../node_modules/@reduxjs/toolkit/src/createAction";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    color: number;
    profileSetup: boolean;
  };
}

const initialState: AuthState = {
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
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
