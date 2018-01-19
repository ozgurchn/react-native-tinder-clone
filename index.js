import { Navigation } from 'react-native-navigation';
import { TouchableOpacity } from 'react-native';
import { ROUTES } from './src/helpers/routes';

TouchableOpacity.defaultProps = { activeOpacity: 0.7 };

Navigation.startSingleScreenApp({
	screen: {
    screen: 'App'
	},
	animationType: 'fade',
	portraitOnlyMode: true,
});
