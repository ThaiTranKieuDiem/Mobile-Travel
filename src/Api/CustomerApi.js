import axiosClient from './AxiosClient';

const url = 'api/Customer';
const customerApi = {
  //login
  Cli_AccessToken: params => {
    return axiosClient.post(`${url}/AccessToken`, params);
  },

  //register
  Cli_RegisterCustomer: params => {
    return axiosClient.post(`${url}/MB_Cli_RegisterCustomer`, params);
  },

  //checkPhone
  Cli_CheckPhoneCustomer: params => {
    return axiosClient.get(`${url}/MB_Cli_CheckPhoneCustomer`, {params});
  },

  //get inforCustomer
  MB_Cli_GetInforCustumer: params => {
    return axiosClient.get(`${url}/MB_Cli_GetInforCustumer`, {params});
  },
  ///update information
  Cli_UpdateCustomer: params => {
    return axiosClient.put(`${url}/MB_Cli_UpdateCustomer`, params);
  },
  Cli_ChangePassword: params => {
    return axiosClient.put(`${url}/MB_Cli_ChangePassword`, params);
  },
};

export default customerApi;
