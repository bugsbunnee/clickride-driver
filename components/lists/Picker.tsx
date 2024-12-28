import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Modal,  FlatList, DimensionValue } from "react-native";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

  const handleOpenSheet = useCallback(() => {
    if (bottomSheetModalRef.current) {
        bottomSheetModalRef.current.present();
    }
  }, []);

  const handleCloseSheet = useCallback(() => {
    if (bottomSheetModalRef.current) {
        bottomSheetModalRef.current.dismiss();
    }
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.value.toString().toLowerCase().includes(query.toLowerCase()));
  }, [query, items]);

  useEffect(() => {
    if (isVisible) handleOpenSheet();
    else handleCloseSheet();
  }, [isVisible]);

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

      <Modal visible={isVisible} animationType="slide" >
          <BottomSheetModalProvider> 
            <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, styles.body]}>
                <BottomSheetModal 
                  animateOnMount 
                  ref={bottomSheetModalRef} 
                  enablePanDownToClose={false} 
                  enableDynamicSizing={false} 
                  index={0} 
                  snapPoints={['75%']}
                >
                    <BottomSheetView style={styles.content}>
                      <TextInput
                        icon="magnifier"
                        placeholder="Enter item to search"
                        onChangeText={(text) => setQuery(text)}
                        value={query}
                        showClearOption
                      />
                    </BottomSheetView>

                    <BottomSheetScrollView style={styles.content}>
                      {filteredItems.map((item) => (
                        <PickerItemComponent
                          isActive={item.value === selectedItem?.value}
                          item={item}
                          key={item.value}
                          label={item.label}
                          onPress={() => onSelectItem(item)}
                        />
                      ))}
                    </BottomSheetScrollView> 

                    <View style={[styles.close, styles.content, { paddingBottom: insets.bottom }]}>
                        <Button label='Close' onPress={() => setVisible(false)} />
                    </View>
                </BottomSheetModal>
            </View>
          </BottomSheetModalProvider>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    backgroundColor: colors.light.modalOpaque,
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
  close: {
    marginTop: 10,
  },
  content: { 
    paddingHorizontal: 20,
  },
  iconContainer: {
		marginRight: 10,
	},
  popup: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  modal: {
    backgroundColor: colors.light.modalOpaque,
    flex: 1,
    zIndex: 100000,
  },
  separator: {
    height: 5,
    width: '100%'
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
