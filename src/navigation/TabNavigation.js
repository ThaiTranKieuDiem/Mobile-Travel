import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Account from '../Pages/AccountPage';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from '../Pages/HomePage';
import {View, Text} from 'react-native';
import CartPage from '../Pages/CartPage';
import NewsPage from '../Pages/NewsPage';
import MetiralTopTab from './MetiralTopTab';

const Tab = createBottomTabNavigator();
function TabNavigationHome(props) {
  const screenOption = (route, color, focused) => {
    let iconName;
    let title;
    switch (route.name) {
      case 'Home':
        iconName = 'home-sharp';
        title = 'Home';
        break;
      case 'Cart':
        iconName = 'cart';
        title = 'Cart';
        break;
      case 'Account':
        iconName = 'person';
        title = 'Account';
        break;
      case 'News':
        iconName = 'newspaper-sharp';
        title = 'News';
      default:
        break;
    }
    return (
      <View style={{alignItems: 'center'}}>
        <Icon
          name={iconName}
          color={color}
          size={24}
          style={{color: focused ? 'rgb(254,46,100)' : '#748c94'}}
        />
        <Text
          style={{
            color: focused ? 'rgb(254,46,100)' : '#748c94',
            fontSize: 12,
          }}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => screenOption(route, '#000', focused),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarVisible: false,
      })}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="News" component={NewsPage} />
      <Tab.Screen name="Cart" component={MetiralTopTab} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default TabNavigationHome;
