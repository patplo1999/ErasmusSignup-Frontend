import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOpinion } from "api/opinionApi";
import { OpinionResponse } from "models/Opinion";
import RequestStatus from "./RequestStatus";

interface State {
  value: OpinionResponse | undefined;
  status: RequestStatus;
}

const initialState: State = {
  value: undefined,
  status: RequestStatus.idle,
};

export const fetchOpinion = createAsyncThunk<
  OpinionResponse,
  { pageSize: string | number; page: string | number; specId: string | number }
>("getOpinions", async ({ pageSize: PageSize, page: Page, specId: SpecId }) => {
  //TODO: Add error handling
  const response = await getOpinion(PageSize, Page, SpecId);
  return response;
});

const opinionSlice = createSlice({
  name: "opinions",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOpinion.pending, state => {
        state.status = RequestStatus.loading;
      })
      .addCase(fetchOpinion.fulfilled, (state, action) => {
        state.status = RequestStatus.idle;
        state.value = action.payload;
      })
      .addCase(fetchOpinion.rejected, state => {
        state.status = RequestStatus.failed;
      });
  },
});

export default opinionSlice.reducer;
