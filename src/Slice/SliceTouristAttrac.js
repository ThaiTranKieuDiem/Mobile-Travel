import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import touristAttractionApi from './../Api/TouristAttrac';

///serach theo địa điểm
export const Cli_GetTourAttractByProAndId = createAsyncThunk(
  'api/TouristAttraction/Cli_GetTourAttractByProAndId',
  async (params, thunkApi) => {
    try {
      const response = await touristAttractionApi.Cli_GetTourAttractByProAndId(
        params,
      );
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
//search theo tên tỉnh thành

export const Cli_GetTourAttractByProvinceName = createAsyncThunk(
  'api/TouristAttraction/Cli_GetTourAttractByProvinceName',
  async (params, thunkApi) => {
    try {
      const response =
        await touristAttractionApi.Cli_GetTourAttractByProvinceName(params);
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

//get details
export const Cli_GetTouristAttrDetails = createAsyncThunk(
  'api/TouristAttraction/Cli_GetTouristAttrDetails',
  async (params, thunkApi) => {
    try {
      const response = await touristAttractionApi.Cli_GetTouristAttrDetails(
        params,
      );
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

const touristAttacSlice = createSlice({
  name: 'TouristAttraction',
  initialState: {
    data: null,
    loading: 'idle',
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(Cli_GetTourAttractByProAndId.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(
      Cli_GetTourAttractByProAndId.fulfilled,
      (state, {payload}) => {
        state.loading = 'loaded';
      },
    );
    builder.addCase(Cli_GetTourAttractByProAndId.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error;
    });

    //////
    builder.addCase(Cli_GetTourAttractByProvinceName.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(
      Cli_GetTourAttractByProvinceName.fulfilled,
      (state, {payload}) => {
        state.loading = 'loaded';
      },
    );
    builder.addCase(
      Cli_GetTourAttractByProvinceName.rejected,
      (state, action) => {
        state.loading = 'error';
        state.error = action.error;
      },
    );
    ///get details
    builder.addCase(Cli_GetTouristAttrDetails.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(Cli_GetTouristAttrDetails.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(Cli_GetTouristAttrDetails.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error;
    });
  },
});

const {reducer: touristAtrcReducer} = touristAttacSlice;
export default touristAtrcReducer;
