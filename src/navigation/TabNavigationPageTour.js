import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TourHotPage from '../Pages/TourPage/TourHotPage';
import TourListPage from '../Pages/TourPage/TourListPage';

const Tab = createBottomTabNavigator();
function TabNavigation() {
  const screenOption = (route, color, focused) => {
    let iconName;
    switch (route.name) {
      case 'TourHotPage':
        iconName = 'whatshot';
        break;
      case 'ListTourPage':
        iconName = 'auto-awesome';
        break;
      default:
        break;
    }
    return (
      <Icon
        name={iconName}
        color={color}
        size={26}
        style={{color: focused ? '#FFD700' : '#748c94'}}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => screenOption(route, '#000', focused),
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="ListTourPage" component={TourListPage} />
      <Tab.Screen name="TourHotPage" component={TourHotPage} />
    </Tab.Navigator>
  );
}

export default TabNavigation;
