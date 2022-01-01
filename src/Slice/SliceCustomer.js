import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import customerApi from './../Api/CustomerApi';

export const Cli_AccessToken = createAsyncThunk(
  'api/Customer/Cli_AccessToken',
  async (params, thunkApi) => {
    try {
      const response = await customerApi.Cli_AccessToken(params);
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

export const Cli_RegisterCustomer = createAsyncThunk(
  'api/Customer/MB_Cli_RegisterCustomer',
  async (params, thunkApi) => {
    try {
      const response = await customerApi.Cli_RegisterCustomer(params);
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

export const MB_RegisterPhoneNumber = createAsyncThunk(
  'api/Customer/MB_RegisterPhoneNumber',
  async (params, thunkApi) => {
    try {
      const response = await customerApi.MB_RegisterPhoneNumber(params);
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

export const Cli_CheckPhoneCustomer = createAsyncThunk(
  'api/Customer/MB_Cli_CheckPhoneCustomer',
  async (params, thunkApi) => {
    try {
      const response = await customerApi.Cli_CheckPhoneCustomer(params);
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

export const MB_Cli_GetInforCustumer = createAsyncThunk(
  'api/Customer/MB_Cli_GetInforCustumer',
  async (params, thunkApi) => {
    try {
      const response = await customerApi.MB_Cli_GetInforCustumer(params);
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

export const Cli_UpdateCustomer = createAsyncThunk(
  'api/Customer/MB_Cli_UpdateCustomer',
  async (params, thunkApi) => {
    try {
      const response = await customerApi.Cli_UpdateCustomer(params);
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

export const Cli_ChangePassword = createAsyncThunk(
  'api/Customer/Cli_ChangePassword',
  async (params, thunkApi) => {
    try {
      const response = await customerApi.Cli_ChangePassword(params);
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

const customerSlice = createSlice({
  name: 'Customer',
  initialState: {
    dataCustomer: {},
    loading: 'idle',
    loadingInfo: 'idle',
    error: '',
  },
  extraReducers: builder => {
    //login
    builder.addCase(Cli_AccessToken.pending, state => {
      state.dataCustomer = {};
      state.loading = 'loading';
    });
    builder.addCase(Cli_AccessToken.fulfilled, (state, {payload}) => {
      state.dataCustomer = payload;
      state.loading = 'loaded';
    });
    builder.addCase(Cli_AccessToken.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error.message;
    });
    //register
    builder.addCase(Cli_RegisterCustomer.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(Cli_RegisterCustomer.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(Cli_RegisterCustomer.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error.message;
    });
    ////
    //check phone
    builder.addCase(Cli_CheckPhoneCustomer.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(Cli_CheckPhoneCustomer.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(Cli_CheckPhoneCustomer.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error.message;
    });
    ///get information customer
    builder.addCase(MB_Cli_GetInforCustumer.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(MB_Cli_GetInforCustumer.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(MB_Cli_GetInforCustumer.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error.message;
    });
    //edit
    builder.addCase(Cli_UpdateCustomer.pending, state => {
      state.loadingInfo = 'loading';
    });
    builder.addCase(Cli_UpdateCustomer.fulfilled, (state, {payload}) => {
      state.loadingInfo = 'loaded';
    });
    builder.addCase(Cli_UpdateCustomer.rejected, (state, action) => {
      state.loadingInfo = 'error';
      state.error = action.error.message;
    });

    //change password
    builder.addCase(Cli_ChangePassword.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(Cli_ChangePassword.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(Cli_ChangePassword.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error.message;
    });

    ///
    builder.addCase(MB_RegisterPhoneNumber.pending, state => {
      state.loading = 'loading';
    });
    builder.addCase(MB_RegisterPhoneNumber.fulfilled, (state, {payload}) => {
      state.loading = 'loaded';
    });
    builder.addCase(MB_RegisterPhoneNumber.rejected, (state, action) => {
      state.loading = 'error';
      state.error = action.error.message;
    });
  },
});

const {reducer: customerReducer} = customerSlice;
export default customerReducer;
