import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../screens/Auth/SplashPage';
import Login from '../screens/Auth/LoginPage';
import Register from '../screens/Auth/RegisterPage';
import Pin from '../screens/Auth/Mpin';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import HomeScreen from '../screens/Main/HomeScreen';
import Drawer from '../components/Drawer';
import ZBWNews from '../screens/Main/HomeComponets/ZBWNews';
import Events from '../screens/Main/HomeComponets/Events';
import ZBWGroup from '../screens/Main/ZBWGroup';
import BecomeAMember from '../screens/Main/HomeComponets/BecomeAMember';
import UpdateMemberDetails from '../screens/Main/HomeComponets/UpdateMemberDetails';
import SecondaryMember from '../screens/Main/HomeComponets/SecondaryMember';
import AddSecondaryMember from '../screens/Main/HomeComponets/AddSecondaryMember';
import LegalSupport from '../screens/Main/HomeComponets/LegalSupport';
import OrderCopies from '../screens/Main/HomeComponets/OrderCopies';
import Complaints from '../screens/Main/HomeComponets/Complaints';
import Market from '../screens/Main/HomeComponets/Market';
import OurPartner from '../screens/Main/HomeComponets/OurPartner';
import AddComplaints from '../screens/Main/HomeComponets/AddComplaints';
import CreatePassword from '../screens/Auth/CreatePassword';
import Otp from '../screens/Auth/Otp';
import About from '../screens/Main/HomeComponets/About';
import Contact from '../screens/Main/HomeComponets/Contact';
import TermService from '../screens/Main/HomeComponets/TermService';
import ChangePassword from '../screens/Auth/ChangePassword';
import PinScreen from '../screens/Auth/SetPinScreen';
import ViewPdf from '../screens/Main/HomeComponets/ViewPdf';
import FirstPage from '../screens/Auth/FirstPage';
import EventDetails from '../screens/Main/HomeComponets/EventDetails';
import MyQRCode from '../screens/Main/HomeComponets/MyQRCode';
import CreatemPinForOldUser from '../screens/Auth/CreatemPinForOldUser';
import CreatePasswordForOldUser from '../screens/Auth/CreatePasswordForOldUser';
import QREventDetails from '../components/EventDetailsForQRCode';
import {createStackNavigator} from '@react-navigation/stack';
import Notification from '../screens/Main/HomeComponets/Notification';
import VideoView from '../screens/Main/HomeComponets/VideoView';
import ViewId from '../screens/Main/HomeComponets/ViewId';
import ViewIdSecondary from '../screens/Main/HomeComponets/ViewIdSecondary';
import MyProfile from '../screens/Main/HomeComponets/MyProfile';
import OurTeam from '../screens/Main/HomeComponets/OurTeam';
import {navigationRef} from './RootNavigation';
import MemeberRegistration from '../screens/Main/HomeComponets/MemeberRegistration';
import ChauviharEventList from '../screens/Main/HomeComponets/ChauviharEventList';
import ChouviharEvent from '../screens/Main/HomeComponets/ChouviharEvent';
import Chauviharcode from '../screens/Main/HomeComponets/ChauviharQR';
import ChauViharMenuDates from '../screens/Main/HomeComponets/ChauViharMenuDates';
import ChauviharEventDetails from '../screens/Main/HomeComponets/ChauviharEventDetails';
import ChauviharEventSelect from '../screens/Main/HomeComponets/ChauviharEventSelect';

const Stack = createStackNavigator();
function Navigate() {
  return (
    <NavigationContainer
      onStateChange={state => {
        const name = state?.routes[state.index].name;
        const fullname = state?.routes;
        console.log('thsis is fullname', JSON.stringify(name));
      }}
      ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterPage" component={Register} />
        <Stack.Screen name="Pin" component={Pin} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="PinScreen" component={PinScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen
          name="CreatemPinForOldUser"
          component={CreatemPinForOldUser}
        />
        <Stack.Screen
          name="CreatePasswordForOldUser"
          component={CreatePasswordForOldUser}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack1 = createStackNavigator();

function Home() {
  return (
    <Stack1.Navigator
      initialRouteName="DashBoard"
      screenOptions={{headerShown: false}}>
      <Stack1.Screen name="DashBoard" component={MyDrawer} />
      <Stack1.Screen name="ZBWNews" component={ZBWNews} />
      <Stack1.Screen name="Events" component={Events} />
      <Stack1.Screen name="ZBWGroup" component={ZBWGroup} />
      <Stack1.Screen name="BecomeAMember" component={BecomeAMember} />
      <Stack1.Screen
        name="UpdateMemberDetails"
        component={UpdateMemberDetails}
      />
      <Stack1.Screen name="SecondaryMember" component={SecondaryMember} />
      <Stack1.Screen name="AddSecondaryMember" component={AddSecondaryMember} />
      <Stack1.Screen name="LegalSupport" component={LegalSupport} />
      <Stack1.Screen name="OrderCopies" component={OrderCopies} />
      <Stack1.Screen name="Market" component={Market} />
      <Stack1.Screen name="Complaints" component={Complaints} />
      <Stack1.Screen name="OurPartner" component={OurPartner} />
      <Stack1.Screen name="AddComplaints" component={AddComplaints} />
      <Stack1.Screen name="About" component={About} />
      <Stack1.Screen name="Contact" component={Contact} />
      <Stack1.Screen name="Terms" component={TermService} />
      <Stack1.Screen name="ViewPdf" component={ViewPdf} />
      <Stack1.Screen name="VideoView" component={VideoView} />
      <Stack1.Screen name="EventDetails" component={EventDetails} />
      <Stack1.Screen name="MyQRCode" component={MyQRCode} />
      <Stack1.Screen name="QREventDetails" component={QREventDetails} />
      <Stack1.Screen name="Notification" component={Notification} />
      <Stack1.Screen name="ViewId" component={ViewId} />
      <Stack1.Screen name="ViewIdSecondary" component={ViewIdSecondary} />
      <Stack1.Screen name="MyProfile" component={MyProfile} />
      <Stack1.Screen name="OurTeam" component={OurTeam} />
      <Stack1.Screen
        name="MemeberRegistration"
        component={MemeberRegistration}
      />
      <Stack1.Screen name="ChauviharEventList" component={ChauviharEventList} />
      <Stack1.Screen name="ChouviharEvent" component={ChouviharEvent} />
      <Stack1.Screen name="Chauviharcode" component={Chauviharcode} />
      <Stack1.Screen name="ChauViharMenuDates" component={ChauViharMenuDates} />
      <Stack1.Screen
        name="ChauviharEventDetails"
        component={ChauviharEventDetails}
      />
      <Stack1.Screen
        name="ChauviharEventSelect"
        component={ChauviharEventSelect}
      />
    </Stack1.Navigator>
  );
}

const DrawerStack = createDrawerNavigator();
function MyDrawer() {
  return (
    <DrawerStack.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={() => <Drawer />}>
      <DrawerStack.Screen name="Home" component={HomeScreen} />
    </DrawerStack.Navigator>
  );
}

export default Navigate;
