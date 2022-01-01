import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import provinceApi from './../Api/ProvinceApi';
import BookTourPage from './../Pages/BookingTour/BookTourPage';
export const Cli_GetProvince = createAsyncThunk(
  'api/Province/Cli_GetProvince',
  async (params, thunkApi) => {
    try {
      const response = await provinceApi.Cli_GetProvince(params);
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

const provinceSlice = createSlice({
  name: 'Province',
  initialState: {
    data: null,
    loading: 'idle',
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(Cli_GetProvince.pending, state => {
      state.data = null;
      state.loading = 'loading';
    });
    builder.addCase(Cli_GetProvince.fulfilled, (state, {payload}) => {
      state.data = {payload};
      state.loading = 'loaded';
    });
    builder.addCase(Cli_GetProvince.rejected, (state, action) => {
      state.data = [];
      state.loading = 'error';
      state.error = action.error;
    });
  },
});

const {reducer: provinceReducer} = provinceSlice;
export default provinceReducer;
