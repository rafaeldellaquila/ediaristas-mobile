import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderTitle,
} from '@react-navigation/stack';
import { NavigationTheme } from 'ui/themes/AppTheme';
import Index from 'pages/Index';
import SearchProfessional from 'pages/SearchProfessional';
import Logo from '@assets/img/logos/e-diaristas-logo.png';
import { Image } from 'react-native';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Index: undefined;
  SearchProfessional: undefined;
};

const Router: React.FC = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={'Index'}
          component={Index}
          options={{
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Image
                source={Logo}
                style={{
                  width: 150,
                  height: 50,
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name={'SearchProfessional'}
          component={SearchProfessional}
          options={{ title: 'Encontrar Diarista' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
