import { useEffect, useState } from "react";
import { PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';
import { Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold, Urbanist_800ExtraBold } from "@expo-google-fonts/urbanist";

import { useAppDispatch } from "@/store/hooks";
import { setSession } from "@/store/auth/slice";

import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import storage from '@/utils/storage';

SplashScreen.preventAutoHideAsync();

const useInitializeApp = () => {
    const [isReady, setReady] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await Font.loadAsync({
                    PlusJakartaSansRegular: PlusJakartaSans_400Regular,
                    PlusJakartaSansMedium: PlusJakartaSans_500Medium,
                    PlusJakartaSansSemiBold: PlusJakartaSans_600SemiBold,
                    PlusJakartaSansBold: PlusJakartaSans_700Bold,
                    PlusJakartaSansExtraBold: PlusJakartaSans_800ExtraBold,
                    UrbanistRegular: Urbanist_400Regular,
                    UrbanistMedium: Urbanist_500Medium,
                    UrbanistSemiBold: Urbanist_600SemiBold,
                    UrbanistBold: Urbanist_700Bold,
                    UrbanistExtraBold: Urbanist_800ExtraBold,
                });

                const session = await storage.getSession();
                if (session) dispatch(setSession(session));
            } catch (error) {
                console.log(error);
            } finally {
                setReady(true);
            }
        };
        
        initializeApp();
    }, []);

    useEffect(() => {
        const hideSplash = async () => {
            await SplashScreen.hideAsync();
        };

        if (isReady) {
            hideSplash();
        }
    }, [isReady]);

    return isReady;
};
 
export default useInitializeApp;