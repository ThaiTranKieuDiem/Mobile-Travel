import axiosClient from './AxiosClient';

const url = 'api/Province';
const provinceApi = {
  Cli_GetProvince: params => {
    return axiosClient.get(`${url}/Adm_GetProvince`, {params});
  },
};
export default provinceApi;
