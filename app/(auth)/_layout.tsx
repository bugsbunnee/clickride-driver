import { Redirect, Stack } from "expo-router";
import { setAuthenticating } from "@/store/auth/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Splash from "@/components/ui/Splash";

const AuthLayout = () => {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    if (auth.isAuthenticating) {
        return <Splash onDone={() => dispatch(setAuthenticating(false))} />;
    }

    if (auth.user) {
        return <Redirect href='/' />
    }

    return ( 
        <Stack initialRouteName="index" screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
        </Stack>
     );
};
 
export default AuthLayout;