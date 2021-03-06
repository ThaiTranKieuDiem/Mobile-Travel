import axiosClient from './AxiosClient';

const url = '/api/Tour';
const tourApi = {
  // Lấy danh sách các tour được đề xuất
  GetTourTourIsSuggest: params => {
    return axiosClient.get(`${url}/TourIsSuggest`, {
      params,
    });
  },

  //lấy danh sách tất cả tour có phân trang
  Cli_GetTourListPagination: params => {
    return axiosClient.post(`${url}/Cli_GetDataTourSearch`, params);
  },

  //get tourdetail
  Cli_GetTourDescriptionById: params => {
    return axiosClient.get(`${url}/TourDetails`, {params});
  },
};

export default tourApi;
