import axiosClient from './AxiosClient';

const url = 'api/TouristAttraction';
const touristAttractionApi = {
  // search theo tên
  Cli_GetTourAttractByProAndId: params => {
    return axiosClient.get(`${url}/MB_Cli_GetTourAttractByProAndId`, {params});
  },

  //search theo tên tỉnh thành
  Cli_GetTourAttractByProvinceName: params => {
    return axiosClient.get(`${url}/MB_Cli_GetTourAttractByProvinceName`, {
      params,
    });
  },

  //get details by id
  Cli_GetTouristAttrDetails: params => {
    return axiosClient.get(`${url}/MB_Cli_GetTouristAttrDetails`, {params});
  },
};

export default touristAttractionApi;
