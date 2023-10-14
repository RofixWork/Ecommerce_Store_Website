import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
//verify token function
function verifyToken(keyName) {
  const token = localStorage.getItem(keyName);

  if (token) {
    const decodeToken = jwtDecode(token);
    const expireDate = new Date(decodeToken.exp * 1000);

    if (new Date() > expireDate) {
      localStorage.removeItem(keyName);
      return null;
    } else {
      return token;
    }
  } else {
    return null;
  }
}
//user token
var userJwtToken = localStorage.getItem("user-token");
//intial state
const initialState = {
  adminToken: verifyToken("admin-token"),
  userToken: verifyToken("user-token"),
  user: userJwtToken ? jwtDecode(userJwtToken) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },
    logout: (state) => {
      localStorage.removeItem("admin-token");
      state.adminToken = null;
    },
    userLogout: (state) => {
      state.user = null;
      state.userToken = null;
      localStorage.removeItem("user-token");
    },
  },
});
//export reducer
export default authSlice.reducer;
//export all actions
export const { setAdminToken, logout, setUserToken, userLogout } =
  authSlice.actions;
