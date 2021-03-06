import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomePage from '../Pages/WelcomePage';
import TourDetails from '../Pages/TourPage/TourDetailPage';
import TabNavigationHome from './TabNavigation';
import BookTourPage from '../Pages/BookingTour/BookTourPage';
import TabNavigation from './TabNavigationPageTour';
import LoginPage from '../Pages/Customer/LoginPage';
import RegisterPage from '../Pages/Customer/RegisterPage';
import SearchPage from '../Pages/Search/SearchHome';
import TouristAttractionPage from './../Pages/TouristAtraction/TouristAtractionPage';
import RegisterInfo from './../Pages/Customer/RegisterInfro';
import TouristAttractionSearchPr from './../Pages/TouristAtraction/TouristAttractionSearchPr';
import TouristAtractionDetails from './../Pages/TouristAtraction/TouristAtractionDetails';
import InfomationCustomer from './../Pages/Customer/InfomationCustomer';
import ChangePasswordPage from './../Pages/Customer/ChangePasswordPage';
import PaymentMethodPage from '../Pages/BookingTour/PaymentmethodPage';
import PaymenTicketPage from './../Pages/BookingTour/PaymentTicketPage';
import FilterPage from './../Pages/Search/FilterPage';
import BookedCancel from './../Pages/cart/BookedCancel';
import InforMationTicket from './../Pages/BookingTour/InforMationTicket';
import NotificationPage from '../Pages/Notifications/NotificationPage';
import NewsDetails from '../Pages/News/NewsDetails';
import NewsByKindPage from './../Pages/News/NewsByKindPage';

const Stack = createNativeStackNavigator();
function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="WelcomePage">
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="HomePage"
        component={TabNavigationHome}
        name="WelcomePage"
        component={WelcomePage}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="HomePage"
        component={TabNavigationHome}
      />
      <Stack.Screen
        options={({router}) => ({
          headerShown: false,
        })}
        name="TourPage"
        component={TabNavigation}
      />
      {/** */}
      <Stack.Screen
        name="TourDetails"
        component={TourDetails}
        options={({router}) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          title: '',
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Booking"
        component={BookTourPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PaymenTicketPage"
        component={PaymenTicketPage}
      />
      {/** */}
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginPage"
        component={LoginPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="RegisterPage"
        component={RegisterPage}
      />
      <Stack.Screen
        options={{title: '????ng k?? th??nh vi??n'}}
        name="RegisterInfo"
        component={RegisterInfo}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchHome"
        component={SearchPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TouristAttractionPage"
        component={TouristAttractionPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TouristAttractionSearchPr"
        component={TouristAttractionSearchPr}
      />
      <Stack.Screen
        options={({router}) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          title: '',
          headerTintColor: '#fff',
        })}
        name="TouristAttrDetailPage"
        component={TouristAtractionDetails}
      />
      <Stack.Screen
        options={{title: 'Th??ng tin c?? nh??n'}}
        name="InformationCustomer"
        component={InfomationCustomer}
      />
      <Stack.Screen
        options={{title: '?????i m???t kh???u'}}
        name="ChangePassword"
        component={ChangePasswordPage}
      />
      <Stack.Screen
        options={{title: 'Ph????ng th???c thanh to??n'}}
        name="PaymentMethodPage"
        component={PaymentMethodPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="InforMationTicket"
        component={InforMationTicket}
      />
      <Stack.Screen
        options={{title: 'B??? l???c t??m ki???m'}}
        name="FilterPage"
        component={FilterPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BookedCancelPage"
        component={BookedCancel}
      />
      <Stack.Screen
        options={{title: 'Th??ng b??o'}}
        name="NotificationPage"
        component={NotificationPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NewsDetails"
        component={NewsDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NewsByKindPage"
        component={NewsByKindPage}
      />
    </Stack.Navigator>
  );
}
export default StackNavigation;
