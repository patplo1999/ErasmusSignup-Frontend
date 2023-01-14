import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken, getOAuthUrl, revokeAccessToken } from "api/userApi";
import OAuthData from "models/OAuthData";
import RequestStatus from "./RequestStatus";

interface State {
  userLoggedIn: boolean;
  status: RequestStatus;
}

const initialState: State = {
  userLoggedIn: false,
  status: RequestStatus.idle,
};

export const fetchOAuthUrl = createAsyncThunk<OAuthData>("oauth_url", async () => {
  //TODO: Add error handling
  const response = await getOAuthUrl();
  console.log(response);
  return response;
});

//TODO: Handle token expiration
export const logIn = createAsyncThunk<string, { oAuthToken: string; oAuthVerifier: string }>(
  "login",
  async ({ oAuthToken, oAuthVerifier }) => {
    const oAuthTokenSecret = localStorage.getItem("token-secret");
    if (oAuthTokenSecret === null) {
      throw Error("OAuth Token missing.");
    }

    const response = await getAccessToken({
      oAuthToken,
      oAuthVerifier,
      oAuthTokenSecret,
    });
    return response;
  }
);

export const logOut = createAsyncThunk("logout", async () => {
  const response = await revokeAccessToken();

  return response;
});

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutLocally(state) {
      localStorage.removeItem("access-token");
      state.userLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      // fetchOAuthUrl
      .addCase(fetchOAuthUrl.pending, state => {
        state.status = RequestStatus.loading;
      })
      .addCase(fetchOAuthUrl.fulfilled, (state, action) => {
        state.status = RequestStatus.idle;
        localStorage.setItem("token-secret", action.payload.oAuthTokenSecret);
        window.location.href = action.payload.oAuthUrl;
      })
      .addCase(fetchOAuthUrl.rejected, state => {
        state.status = RequestStatus.failed;
      })
      // logIn
      .addCase(logIn.pending, state => {
        state.status = RequestStatus.loading;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = RequestStatus.idle;
        localStorage.removeItem("token-secret");
        localStorage.setItem("access-token", action.payload);
        state.userLoggedIn = true;
      })
      .addCase(logIn.rejected, state => {
        state.status = RequestStatus.failed;
      })
      // logOut
      .addCase(logOut.pending, state => {
        state.status = RequestStatus.loading;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.status = RequestStatus.idle;
      })
      .addCase(logOut.rejected, state => {
        state.status = RequestStatus.failed;
      });
  },
});

export const { logOutLocally } = loginSlice.actions;
export default loginSlice.reducer;
