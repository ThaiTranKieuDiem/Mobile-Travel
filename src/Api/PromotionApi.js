import axiosClient from './AxiosClient';

const url = 'api/Promotion';
const promotionApi = {
  Cli_GetDataPromotion: params => {
    return axiosClient.post(`${url}/Adm_GetDataPromotion`, params);
  },
  Cli_PromotionDetails: params => {
    return axiosClient.get(`${url}/Adm_PromotionDetails`, {params});
  },
};
export default promotionApi;
