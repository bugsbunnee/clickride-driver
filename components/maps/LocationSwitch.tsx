import { Switch } from "react-native";
import { useCallback } from "react";

import { colors } from "@/constants";
import useLocation from "@/hooks/useLocation";

const LocationSwitch = () => {
    const location = useLocation();

    const handlePermissionToggle = useCallback(() => {
        if (location.granted) return;
        else location.requestPermission();
    }, [location]);

    return (
        <Switch
            trackColor={{false: colors.light.grayDeep, true: colors.light.primary}}
            thumbColor={colors.light.white}
            disabled={location.granted}
            onValueChange={handlePermissionToggle}
            value={location.granted}
        />
    );
};
 
export default LocationSwitch;