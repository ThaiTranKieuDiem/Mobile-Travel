import {configureStore} from '@reduxjs/toolkit';
import tourReducer from '../Slice/SliceTour';
import touristAttracReducer from '../Slice/SliceTouristAttrac';
import customerReducer from '../Slice/SliceCustomer';
import bookingTourReducer from '../Slice/SliceBookingTour';

export default configureStore({
  reducer: {
    tour: tourReducer,
    touristAttraction: touristAttracReducer,
    customer: customerReducer,
    booking: bookingTourReducer,
  },
});
