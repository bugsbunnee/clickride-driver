import React, { useMemo, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Modal, DimensionValue, ScrollView } from "react-native";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Text, TextInput } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from '@/constants';
import { PickerItemModel } from "@/utils/models";

import PickerItem from "@/components/lists/PickerItem";

export interface PickerProps {
    label: string;
    items: PickerItemModel[];
    selectedItem: PickerItemModel | null;
    placeholder: string;
    icon?: string;
    PickerItemComponent?: React.ElementType;
    onSelectItem: (item: PickerItemModel) => void;
    width?: DimensionValue;
}

const Picker: React.FC<PickerProps> = ({
  items,
  label,
  icon,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) => {
  const [isVisible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  const insets = useSafeAreaInsets();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const valueToTraverse = item.value.toString().toLowerCase();
      const labelToTraverse = item.label.toString().toLowerCase();
      const queryToTraverse = query.toLowerCase();

      return valueToTraverse.includes(queryToTraverse) || labelToTraverse.includes(queryToTraverse);
    });
  }, [query, items]);

  return (
    <>
      <View style={styles.picker}>
        <Text style={styles.label}>{label}</Text>
      
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <View style={[styles.container, { width }]}>
            {icon && (
              <View style={styles.iconContainer}>
                <SimpleLineIcons
                  name={icon as any} 
                  size={icons.SIZES.SMALL} 
                  color={colors.light.gray} />
              </View>
            )}

            {selectedItem ? (
              <Text style={styles.text}>{selectedItem.label}</Text>
            ) : (
              <Text style={styles.placeholder}>{placeholder}</Text>
            )}

            <FontAwesome
              name="caret-down"
              size={icons.SIZES.NORMAL}
              color={colors.light.dark}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.flex}>
        <Modal visible={isVisible} animationType="slide">
          <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, styles.body]}>
            <View style={styles.inputContainer}>
              <TextInput
                icon='magnifier'
                placeholder="Enter item to search"
                onChangeText={(text) => setQuery(text)}
                value={query}
                style={styles.inputText}
                containerStyle={styles.input}
                showClearOption
              />
            </View>

            <ScrollView bounces={false} contentContainerStyle={styles.content}>
              {filteredItems.map((item) => (
                <PickerItemComponent
                  isActive={item.value === selectedItem?.value}
                  item={item}
                  key={item.value}
                  label={item.label}
                  onPress={() => onSelectItem(item)}
                />
              ))}
            </ScrollView>

            <View style={styles.footer}>
              <Button label='Close' onPress={() => setVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    backgroundColor: colors.light.white,
  },
  container: {
    borderWidth: 1,
		borderRadius: 50,
		borderColor: colors.light.dew,
		backgroundColor: colors.light.dew,
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
    gap: 4,
		paddingHorizontal: 16,
  },
  footer: {
    padding: 16,
    borderTopColor: colors.light.dewDark,
    borderTopWidth: 1,
  },
  content: { 
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.light.white,
  },
  flex: { flex: 1 },
  iconContainer: {
		marginRight: 10,
	},
  input: { 
    backgroundColor: colors.light.dew,
    borderRadius: 8,
  },
  inputContainer: {
    paddingHorizontal: 16,
    borderBottomColor: colors.light.dewDark,
    borderBottomWidth: 1,
  },
  inputText: {
    fontSize: 14,
    fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    flex: 1,
    alignSelf: 'center'
  },
  popup: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  modal: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flex: 1,
  },
  modalContent: {
      backgroundColor: colors.light.white,
      flex: 1,
  },
  label: {
		color: colors.light.dark,
		fontSize: 15,
		lineHeight: 24,
		marginBottom: 6,
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
	},
  placeholder: {
    color: colors.light.placeholder,
    fontSize: 12,
    lineHeight: 20,
		letterSpacing: 0.25,
		flex: 1,
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
  },
  picker: {
		marginBottom: 18,
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
