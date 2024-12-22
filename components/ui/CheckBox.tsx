import React, { PropsWithChildren } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, icons, styles as defaultStyles } from "@/constants";

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
                        size={8} 
                    />
                )}
            </View>

            <View style={styles.flex}>
                {children}
            </View>
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    checkbox: { 
        borderWidth: 1,
        borderColor: colors.light.borderMid,
        width: 10,
        height: 10,
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 9,
        flex: 1
    },
    flex: { 
        flex: 1, 
        marginTop: -4,
    },
});

export default CheckBox;