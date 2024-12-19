import React, { PropsWithChildren } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, icons, styles as defaultStyles } from "@/constants";

import Text from '@/components/ui/Text';

interface Props extends PropsWithChildren {
    isChecked: boolean;
    onChange: () => void;
}

const CheckBox: React.FC<Props> = ({ children, isChecked, onChange }) => {
    return ( 
        <TouchableOpacity style={styles.container} onPress={onChange}>
            <View style={styles.checkbox}>
                {isChecked && (
                    <MaterialCommunityIcons 
                        name='check' 
                        color={colors.light.primary} 
                        size={12} 
                    />
                )}
            </View>

            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    checkbox: { 
        borderWidth: 1,
        borderColor: colors.light.borderMid,
        width: 15,
        height: 15,
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 9,
    },
    text: {
        color: colors.light.graySemi,
        fontSize: 10,
        lineHeight: 14,
        marginTop: -4,
        fontFamily: defaultStyles.jakartaRegular.fontFamily
    }
});

export default CheckBox;