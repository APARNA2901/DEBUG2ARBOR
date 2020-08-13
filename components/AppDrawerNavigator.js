import React from 'react';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './customSideBarMenu1';
import {createDrawerNavigator } from 'react-navigation-drawer';
import SettingScreen from '../screens/SettingScreen';
import myDonationsScreen from '../screens/myDonationsScreen.js';
import notificationScreen from '../screens/notificationScreen.js';
export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen: AppTabNavigator
 
   },
   MyDonations  : {
       screen: myDonationsScreen
   },
  Settings:{
     screen : SettingScreen
 },
 Notifications:{
     screen : notificationScreen
 },
},
{
    contentComponent:CustomSideBarMenu
},{
initialRouteName : 'Home'
})