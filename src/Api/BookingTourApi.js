import axiosClient from './AxiosClient';

const url = 'api/BookingTour';
const bookingTourApi = {
  Adm_CreateBookingTour: params => {
    return axiosClient.post(`${url}/Adm_CreateBookingTour`, params);
  },
};

export default bookingTourApi;
