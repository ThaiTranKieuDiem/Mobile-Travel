import {configureStore} from '@reduxjs/toolkit';
import tourReducer from '../Slice/SliceTour';
import touristAttracReducer from '../Slice/SliceTouristAttrac';
import customerReducer from '../Slice/SliceCustomer';
import bookingTourReducer from '../Slice/SliceBookingTour';
import enumerateReducer from '../Slice/SliceEnumerate';
import provinceReducer from '../Slice/SliceProvince';
import promotionReducer from '../Slice/SlicePromotion';

export default configureStore({
  reducer: {
    tour: tourReducer,
    touristAttraction: touristAttracReducer,
    customer: customerReducer,
    booking: bookingTourReducer,
    enumerate: enumerateReducer,
    province: provinceReducer,
    promotion: promotionReducer,
  },
});
