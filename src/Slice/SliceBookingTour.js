import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import bookingTourApi from './../Api/BookingTourApi';

export const Adm_CreateBookingTour = createAsyncThunk(
  'api/BookingTour/Adm_CreateBookingTour',
  async (params, thunkApi) => {
    try {
      const response = bookingTourApi.Adm_CreateBookingTour(params);
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

const sliceBookingTour = createSlice({
  name: 'BookingTour',
  initialState: {
    data: null,
    loading: 'idle',
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(Adm_CreateBookingTour.pending, state => {
      state.data = null;
      state.loading = 'loading';
    });
    builder.addCase(Adm_CreateBookingTour.fulfilled, (state, {payload}) => {
      state.data = payload;
      state.loading = 'loaded';
    });
    builder.addCase(Adm_CreateBookingTour.rejected, (state, action) => {
      state.data = [];
      state.loading = 'error';
      state.error = action.error;
    });
  },
});

const {reducer: bookingTourReducer} = sliceBookingTour;
export default bookingTourReducer;
