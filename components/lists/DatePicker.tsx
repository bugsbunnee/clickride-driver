import React, { useCallback, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { View, StyleSheet, TouchableOpacity, DimensionValue } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Text } from "@/components/ui";
import { colors, icons, styles as defaultStyles } from '@/constants';
import { formatDate } from "@/utils/lib";



interface Props {
	width?: DimensionValue;
    format: string;
    label: string;
    mode: "date" | "datetime" | "countdown" | "time";
    minimumDate?: Date;
    placeholder: string;
    selectDate: Date;
    onDateChange: (date: Date) => void;
    onPress: () => void;
}

const DatePicker: React.FC<Props> = ({ format, label, mode, minimumDate, placeholder, selectDate, onDateChange, onPress, width }) => {
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
        setPickerVisible(false);
        if (selectedDate) onDateChange(selectedDate);
    }, []);

    const handleTap = useCallback(() => {
        onPress();
        setPickerVisible(true);
    }, []);

  return (
        <>
            <TouchableOpacity onPress={handleTap}>
                <View style={[styles.container, { width }]}>
                    {selectDate 
                        ? <Text style={styles.text}>{formatDate(selectDate)}</Text>
                        : <Text style={styles.placeholder}>{placeholder}</Text>} 

                    <FontAwesome
                        name="caret-down"
                        size={icons.SIZES.NORMAL}
                        color={colors.light.dark}
                    />
                </View>
            </TouchableOpacity>

            {isPickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectDate}
                    mode={mode}
                    minimumDate={minimumDate}
                    is24Hour
                    onChange={handleChange}
                    style={{ marginVertical: 10 }}
                />
            )}
        </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.dew,
    borderColor: colors.light.dewDark,
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

export default DatePicker;
