import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import tourApi from './../Api/TourApi';

///get cac tour duoc de xuat
export const Cli_GetTourTourIsSuggest = createAsyncThunk(
  'api/Tour/TourIsSuggest',
  async (params, thunkApi) => {
    try {
      const response = await tourApi.GetTourTourIsSuggest(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        // status: error.response.status,
        //message: error.response.data,
      });
    }
  },
);

///get tat ca cac tour theo dieu kien
export const Cli_GetTourListPagination = createAsyncThunk(
  'api/Tour/Cli_GetTourListPagination',
  async (params, thunkApi) => {
    try {
      const response = await tourApi.Cli_GetTourListPagination(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        //status: error.response.status,
        //message: error.response.data,
      });
    }
  },
);

///get tourDetail by Id
export const Cli_GetTourDescriptionById = createAsyncThunk(
  'api/Tour/Cli_GetTourDescriptionById',
  async (params, thunkApi) => {
    try {
      const response = await tourApi.Cli_GetTourDescriptionById(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        //status: error.response.status,
        //message: error.response.data,
      });
    }
  },
);

const tourSlice = createSlice({
  name: 'Tour',
  initialState: {
    tourList: null,
    TourIsSuggest: null,
    TourDetailId: null,
    loadingDetailId: 'idle',
    loadTourList: 'idle',
    loading: 'idle',
    error: '',
  },
  extraReducers: builder => {
    ///get tour được đề xuất
    builder.addCase(Cli_GetTourTourIsSuggest.pending, state => {
      state.TourIsSuggest = null;
      state.loading = 'loading';
    });
    builder.addCase(Cli_GetTourTourIsSuggest.fulfilled, (state, {payload}) => {
      state.TourIsSuggest = payload;
      state.loading = 'loaded';
    });
    builder.addCase(Cli_GetTourTourIsSuggest.rejected, (state, action) => {
      state.TourIsSuggest = [];
      state.loading = 'error';
      state.error = action.error;
    });

    //get tất cả các tour
    builder.addCase(Cli_GetTourListPagination.pending, state => {
      state.tourList = null;
      state.loadTourList = 'loading';
    });
    builder.addCase(Cli_GetTourListPagination.fulfilled, (state, {payload}) => {
      state.tourList = payload;
      state.loadTourList = 'loaded';
    });
    builder.addCase(Cli_GetTourListPagination.rejected, (state, action) => {
      state.tourList = [];
      state.loadTourList = 'error';
      state.error = action.error;
    });

    //get tourDetail
    builder.addCase(Cli_GetTourDescriptionById.pending, state => {
      state.loadingDetailId = 'loading';
    });
    builder.addCase(
      Cli_GetTourDescriptionById.fulfilled,
      (state, {payload}) => {
        state.TourDetailId = payload;
        state.loadingDetailId = 'loaded';
      },
    );
    builder.addCase(Cli_GetTourDescriptionById.rejected, (state, action) => {
      state.loadingDetailId = 'error';
      state.error = action.error;
    });
  },
});

const {reducer: tourReducer} = tourSlice;
export default tourReducer;
