// In App.js in a new project

import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './HomeScreen';
import ListPoemScreen from './ListPoemScreen';
import PoemScreen from './PoemScreen';
import DetailsScreen from './DetailsScreen';

import SigninScreen from './SigninScreen';
import RegisterScreen from './RegisterScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import DownloadAudiosScreen from './DownloadAudiosScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ProfileScreen from './ProfileScreen';
import InfoScreen from './InfoScreen';
import SearchScreen from './SearchScreen';

import TabNavigator from './TabScreen';
import SherNavigator from './SherTabsScreen';
import BookmarksNavigator from './BookmarksTabsScreen';
import DiscussionNavigator from './DiscussionTabsScreen';



const AppNavigator = createStackNavigator(
    {
    Home: HomeScreen,
    ListPoem: ListPoemScreen,
    TabFunction: TabNavigator,
    SherTabs: SherNavigator,
    BookmarksTabs: BookmarksNavigator,
    DiscussionTabs: DiscussionNavigator,
    Poem: PoemScreen,
    Signin: SigninScreen,
    Register: RegisterScreen,
    ChangePassword: ChangePasswordScreen,
    DownloadAudios: DownloadAudiosScreen,
    ForgotPassword: ForgotPasswordScreen,
    Profile: ProfileScreen,
    Info: InfoScreen,
    Search: SearchScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
    // initialRouteName: "Details"
  }
);

// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <AppContainer />;
  }
}

export default App;
