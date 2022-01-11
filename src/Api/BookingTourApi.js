import axiosClient from './AxiosClient';

const url = 'api/BookingTour';
const bookingTourApi = {
  Adm_CreateBookingTour: params => {
    return axiosClient.post(`${url}/Adm_CreateBookingTour`, params);
  },
  Adm_BookingTourDetailsL: params => {
    return axiosClient.get(`${url}/Adm_BookingTourDetails`, {params});
  },
  MB_GetBookedByCustomer: params => {
    return axiosClient.post(`${url}/MB_GetBookedByCustomer`, params);
  },
  Adm_SendEmailAfterBooking: params => {
    return axiosClient.get(`${url}/Adm_SendEmailAfterBooking`, {params});
  },
  MB_DeleteTourBooked: params => {
    return axiosClient.put(`${url}/MB_DeleteTourBooked`, params);
  },
};

export default bookingTourApi;
