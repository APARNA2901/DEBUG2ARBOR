import {createStackNavigator} from 'react-navigation-stack';
import BookDonateScreen from '../screens/bookDonateScreen.js';
import recieverDetailsScreen from '../screens/recieverDetailsScreen.js';

export const AppStackNavigator = createStackNavigator ({
bookDonateList : {
    screen : BookDonateScreen,
    navigationOptions : {
        headerShown : false
    }
},
recieverDetails : {
    screen : recieverDetailsScreen,
    navigationOptions : {
        headerShown : false
    }
},
},
{initialRouteName : 'bookDonateList'}
);