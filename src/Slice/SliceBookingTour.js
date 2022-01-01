import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import bookingTourApi from './../Api/BookingTourApi';

export const CLi_CreateBookingTour = createAsyncThunk(
  'api/BookingTour/CLi_CreateBookingTour',
  async (params, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_CreateBookingTour(params);
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

export const Cli_GetTourBooked = createAsyncThunk(
  'api/BookingTour/Cli_GetTourBooked',
  async (params, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_BookingTourDetailsL(params);
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

export const MB_GetBookedByCustomer = createAsyncThunk(
  'api/BookingTour/MB_GetBookedByCustomer',
  async (params, thunkApi) => {
    try {
      const response = await bookingTourApi.MB_GetBookedByCustomer(params);
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

export const Adm_SendEmailAfterBooking = createAsyncThunk(
  'api/BookingTour/Adm_SendEmailAfterBooking',
  async (params, thunkApi) => {
    try {
      const response = await bookingTourApi.Adm_SendEmailAfterBooking(params);
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

export const MB_DeleteTourBooked = createAsyncThunk(
  'api/BookingTour/MB_DeleteTourBooked',
  async (params, thunkApi) => {
    try {
      const response = await bookingTourApi.MB_DeleteTourBooked(params);
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
    data: {},
    loading: 'idle',
    dataBooked: null,
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(CLi_CreateBookingTour.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(CLi_CreateBookingTour.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(CLi_CreateBookingTour.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error;
    });
    ///get booking tour details
    builder.addCase(Cli_GetTourBooked.pending, state => {
      state.data = null;
      state.loading = 'loading';
    });
    builder.addCase(Cli_GetTourBooked.fulfilled, (state, {payload}) => {
      state.data = payload;
      state.loading = 'loaded';
    });
    builder.addCase(Cli_GetTourBooked.rejected, (state, action) => {
      state.data = [];
      state.loading = 'error';
      state.error = action.error;
    });

    ///get booked by customer id
    builder.addCase(MB_GetBookedByCustomer.pending, state => {
      state.dataBooked = null;
      state.loading = 'loading';
    });
    builder.addCase(MB_GetBookedByCustomer.fulfilled, (state, {payload}) => {
      state.dataBooked = payload;
      state.loading = 'loaded';
    });
    builder.addCase(MB_GetBookedByCustomer.rejected, (state, action) => {
      state.dataBooked = [];
      state.loading = 'error';
      state.error = action.error;
    });

    ///adm send email when booked
    builder.addCase(Adm_SendEmailAfterBooking.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(Adm_SendEmailAfterBooking.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(Adm_SendEmailAfterBooking.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error;
    });
    //cli delete tour booked
    builder.addCase(MB_DeleteTourBooked.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(MB_DeleteTourBooked.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(MB_DeleteTourBooked.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.status;
    });
  },
});

const {reducer: bookingTourReducer} = sliceBookingTour;
export default bookingTourReducer;
