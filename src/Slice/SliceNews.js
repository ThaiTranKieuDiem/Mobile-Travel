import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import newsApi from '../Api/NewsApi';

export const Cli_GetDataNews = createAsyncThunk(
  'api/News/Cli_GetDataNews',
  async (params, thunkApi) => {
    try {
      const response = await newsApi.Cli_GetDataNews(params);
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

export const Cli_GetDataNewsDetails = createAsyncThunk(
  'api/News/Cli_GetDataNewsDetails',
  async (params, thunkApi) => {
    try {
      const response = await newsApi.Cli_GetDataNewsDetails(params);
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

const newsSlice = createSlice({
  name: 'News',
  initialState: {
    data: null,
    loading: 'idle',
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(Cli_GetDataNews.pending, state => {
      state.data = null;
      state.loading = 'loading';
    });
    builder.addCase(Cli_GetDataNews.fulfilled, (state, {payload}) => {
      state.data = {payload};
      state.loading = 'loaded';
    });
    builder.addCase(Cli_GetDataNews.rejected, (state, action) => {
      state.data = null;
      state.loading = 'error';
      state.error = action.message;
    });
    ////
    ///
    builder.addCase(Cli_GetDataNewsDetails.pending, state => {
      state.data = null;
      state.loading = 'loading';
    });
    builder.addCase(Cli_GetDataNewsDetails.fulfilled, (state, {payload}) => {
      state.data = {payload};
      state.loading = 'loaded';
    });
    builder.addCase(Cli_GetDataNewsDetails.rejected, (state, action) => {
      state.data = null;
      state.loading = 'error';
      state.error = action.message;
    });
  },
});

const {reducer: newsReducer} = newsSlice;
export default newsReducer;
