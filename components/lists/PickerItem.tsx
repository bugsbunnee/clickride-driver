import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Text } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from '@/constants';
import { PickerItemModel } from "@/utils/models";

interface Props {
    item: PickerItemModel;
    onPress: () => void;
}

const Picker: React.FC<Props> = ({ item, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.text}>{item.label}</Text>

            <FontAwesome
                name="caret-down"
                size={icons.SIZES.NORMAL}
                color={colors.light.dark}
            />
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
        borderWidth: 1,
		borderRadius: 50,
		borderColor: colors.light.dewDark,
		backgroundColor: colors.light.dew,
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
        gap: 4,
        width: '100%',
		paddingHorizontal: 16,
  },
  placeholder: {
    color: colors.light.placeholder,
    fontSize: 12,
    lineHeight: 20,
		letterSpacing: 0.25,
		flex: 1,
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
  },
  text: {
    color: colors.light.dark,
    fontSize: 12,
    lineHeight: 20,
		letterSpacing: 0.25,
		flex: 1,
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
  },
});

export default Picker;
