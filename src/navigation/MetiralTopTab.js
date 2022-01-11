import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BookedCancel from './../Pages/cart/BookedCancel';
import CartPage from './../Pages/CartPage';

const Tab = createMaterialTopTabNavigator();
function MetiralTopTab() {
  return (
    <Tab.Navigator style={{marginTop: 20}}>
      <Tab.Screen name="Tour đã đặt" component={CartPage} />
      <Tab.Screen name="Tour đã hủy" component={BookedCancel} />
    </Tab.Navigator>
  );
}

export default MetiralTopTab;
