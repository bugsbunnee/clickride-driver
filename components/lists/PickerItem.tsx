import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Text } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from '@/constants';
import { PickerItemModel } from "@/utils/models";

interface Props {
    isActive: boolean;
    item: PickerItemModel;
    onPress: () => void;
}

const Picker: React.FC<Props> = ({ isActive, item, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, isActive ? styles.active : styles.inactive]}>
            <Text style={styles.text}>{item.label}</Text>

            <FontAwesome
                name="th-large"
                size={icons.SIZES.SMALL}
              color={isActive ? colors.light.primary : colors.light.dark}
            />
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.light.primaryLight,
    borderColor: colors.light.primary,
  },
  inactive: {
    borderColor: colors.light.dewDark,
    backgroundColor: colors.light.dew,
  },
  container: {
    borderRadius: 10,
    marginBottom: 12,
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
		fontFamily: defaultStyles.urbanistSemibold.fontFamily,
  },
  text: {
    color: colors.light.dark,
    fontSize: 12,
    lineHeight: 20,
		letterSpacing: 0.25,
		flex: 1,
		fontFamily: defaultStyles.urbanistSemibold.fontFamily,
  },
});

export default Picker;
