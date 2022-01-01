import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import enumerateApi from './../Api/EnumerateApi';

export const Cli_GetEnumConstant = createAsyncThunk(
  'api/CatEnumeration/Cli_GetEnumConstant',
  async (params, thunkApi) => {
    try {
      const response = await enumerateApi.Cli_GetEnumConstant(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        error: error.message,
        status: error.response.status,
        message: error.response.data,
        // muon lay gif cho nay lay .error, message , status
      });
    }
  },
);

const enumerateSlice = createSlice({
  name: 'Enumerate',
  initialState: {
    data: [],
    loading: 'idle',
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(Cli_GetEnumConstant.pending, state => {
      state.data = null;
      state.loading = 'loading';
    });
    builder.addCase(Cli_GetEnumConstant.fulfilled, (state, {payload}) => {
      state.data = payload;
      state.loading = 'loaded';
    });
    builder.addCase(Cli_GetEnumConstant.rejected, (state, action) => {
      state.data = [];
      state.loading = 'error';
      state.error = action.error.message;
    });
  },
});

const {reducer: enumerateReducer} = enumerateSlice;
export default enumerateReducer;
