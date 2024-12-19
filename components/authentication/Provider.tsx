import React from 'react';

import { store } from '@/store';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const colorScheme = useColorScheme();

    return ( 
        <Provider store={store}>
            <ThemeProvider value={DefaultTheme}>
            {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
                <SafeAreaProvider>
                    {children}
                </SafeAreaProvider>
            </ThemeProvider>
        </Provider>
     );
};
 
export default AppProvider;