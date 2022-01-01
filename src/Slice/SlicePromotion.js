import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import promotionApi from '../Api/PromotionApi';

export const Cli_GetDataPromotion = createAsyncThunk(
  'api/Promotion/Cli_GetDataPromotion',
  async (params, thunkApi) => {
    try {
      const response = await promotionApi.Cli_GetDataPromotion(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  },
);

export const Cli_PromotionDetails = createAsyncThunk(
  'api/Promotion/Cli_PromotionDetails',
  async (params, thunkApi) => {
    try {
      const response = await promotionApi.Cli_PromotionDetails(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
      });
    }
  },
);

const promotionSlice = createSlice({
  name: 'Promotion',
  initialState: {
    data: null,
    loading: 'idle',
    dateDetails: {},
    error: '',
  },
  extraReducers: builder => {
    ////get all
    builder.addCase(Cli_GetDataPromotion.pending, state => {
      state.data = null;
      state.loading = 'loading';
    });
    builder.addCase(Cli_GetDataPromotion.fulfilled, (state, {payload}) => {
      state.data = {payload};
      state.loading = 'loaded';
    });
    builder.addCase(Cli_GetDataPromotion.rejected, (state, action) => {
      state.data = [];
      state.loading = 'error';
      state.error = action.error.message;
    });
    //get details
    builder.addCase(Cli_PromotionDetails.pending, state => {
      state.dateDetails = null;
      state.loading = 'loading';
    });
    builder.addCase(Cli_PromotionDetails.fulfilled, (state, {payload}) => {
      state.dateDetails = {payload};
      state.loading = 'loaded';
    });
    builder.addCase(Cli_PromotionDetails.rejected, (state, action) => {
      state.dateDetails = [];
      state.loading = 'error';
      state.error = action.error.message;
    });
  },
});

const {reducer: promotionReducer} = promotionSlice;
export default promotionReducer;
