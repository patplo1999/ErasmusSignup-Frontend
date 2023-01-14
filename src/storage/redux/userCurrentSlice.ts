import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUserData, getUserPreferences } from "api/userApi";
import { User } from "models/User";
import UserPreferences from "models/UserPreferences";
import RequestStatus from "./RequestStatus";

interface State {
  user: User | undefined;
  preferences: UserPreferences | undefined;
  status: RequestStatus;
}

const initialState: State = {
  user: undefined,
  preferences: undefined,
  status: RequestStatus.idle,
};

export const fetchUserCurrent = createAsyncThunk("userCurrent", async () => {
  //TODO: Add error handling
  const response = await getCurrentUserData();
  return response;
});

export const fetchUserPreferences = createAsyncThunk("userPreferences_get", async () => {
  const response = await getUserPreferences();
  return response;
});

const userCurrentSlice = createSlice({
  name: "userCurrent",
  initialState,
  reducers: {
    editUserPreferencesLocally(state, action: PayloadAction<UserPreferences>) {
      state.preferences = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserCurrent.pending, state => {
        state.status = RequestStatus.loading;
      })
      .addCase(fetchUserCurrent.fulfilled, (state, action) => {
        state.status = RequestStatus.idle;
        state.user = action.payload;
      })
      .addCase(fetchUserCurrent.rejected, state => {
        state.status = RequestStatus.failed;
      })
      .addCase(fetchUserPreferences.pending, state => {
        state.status = RequestStatus.loading;
      })
      .addCase(fetchUserPreferences.fulfilled, (state, action) => {
        state.status = RequestStatus.idle;
        state.preferences = {
          preferencedStudyDomainId: action.payload.preferencedStudyDomainId ?? undefined,
          averageGrade: action.payload.averageGrade ?? undefined,
        };
      })
      .addCase(fetchUserPreferences.rejected, state => {
        state.status = RequestStatus.failed;
      });
  },
});

export const { editUserPreferencesLocally } = userCurrentSlice.actions;
export default userCurrentSlice.reducer;
