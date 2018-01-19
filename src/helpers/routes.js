import { Navigation } from 'react-native-navigation';
import { View } from 'react-native';
import App from '../../App';
/* import {
  Home,
  Profile,
  Chat,
} from '../views'; */

export const ROUTES = {
	App: {
		component: () => App,
  },
  Home: {
    component: () => View,
  },
  Chat: {
    component: () => View,
  },
  Profile: {
    component: () => View,
  },
	
};

Object.keys(ROUTES).forEach((routeName) => {
	Navigation.registerComponent(routeName, ROUTES[routeName].component);
  console.log(`Registered route: ${routeName}`);
});
