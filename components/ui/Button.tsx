import React from "react";

import { ColorValue, StyleSheet, TouchableOpacity } from "react-native";
import { colors, styles as defaultStyles } from "@/constants";

import Text from "./Text";

interface Props {
    disabled?: boolean;
    backgroundColor?: ColorValue;
    color?: ColorValue;
    label: string;
    onPress: () => void;
}

const Button: React.FC<Props> = ({ disabled, label, onPress, color = colors.light.white, backgroundColor = colors.light.primary }) => {
    return ( 
        <TouchableOpacity disabled={disabled} style={[styles.container, { backgroundColor: disabled ? colors.light.grayDeep : backgroundColor }]} onPress={onPress}>
            <Text style={[styles.text, { color }]}>
                {label}
            </Text>
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light.primary,
        borderRadius: 90,
        padding: 10.73,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    text: {
        fontSize: 18,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        color: colors.light.white,
        lineHeight: 21,
        textAlign: 'center',
    }
});
 
export default Button;