import axiosClient from './AxiosClient';

const url = 'api/EnumConstant';
const enumerateApi = {
  Cli_GetEnumConstant: params => {
    return axiosClient.get(`${url}/Adm_GetEnumInfo`, {params});
  },
};

export default enumerateApi;
