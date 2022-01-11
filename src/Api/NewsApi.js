import axiosClient from './AxiosClient';

const newsApi = {
  // Client

  Cli_GetDataNews: params => {
    const url = 'api/News/Cli_GetDataNews';
    return axiosClient.post(url, params);
  },
  Cli_GetDataNewsDetails: params => {
    const url = 'api/News/Cli_GetDataNewsDetails';
    return axiosClient.get(url, {params});
  },
};

export default newsApi;
