import React, { useCallback } from "react";
import _ from "lodash";

import { View, StyleSheet, ScrollView } from "react-native";
import { colors, styles as defaultStyles } from '@/constants'
import { PickerItemModel } from "@/utils/models";
import { useFormikContext } from "formik";

import CheckBox from "@/components/ui/CheckBox";
import ErrorMessage from '@/components/forms/ErrorMessage';
import Text from "@/components/ui/Text";


interface Props {
    name: string;
    options: PickerItemModel[];
}

const FormMultiCheckBox: React.FC<Props> = ({ name, options }) => {
    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

    const value = _.get(values, name);

    const handleItemChange = useCallback((selectedValue: string | number) => {
        setFieldTouched(name);
        setFieldValue(name, selectedValue);
    }, [name]);

    return ( 
        <View>
            <Text style={styles.label}>Feature</Text>

            <View style={styles.row}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {options.map((option) => (
                        <View key={option.value} style={styles.option}>
                            <CheckBox isChecked={value === option.value} onChange={() => handleItemChange(option.value)}>
                                <Text style={styles.text}>{option.label}</Text>
                            </CheckBox>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <ErrorMessage
                errorMessage={_.get(errors, name)} 
                isVisible={_.get(touched, name)} 
            />
        </View>
     );
};

const styles = StyleSheet.create({
    container: {},
    label: {
        fontSize: 15, 
        lineHeight: 24,
        marginBottom: 6,
        color: colors.light.black,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
    },
    option: {
        marginRight:15,
    },
    row: { 
        flexDirection: 'row',  
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        gap: 14, 
    },
    text: {
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontSize: 14,
        lineHeight: 18,
        color: colors.light.black,
        textTransform: 'uppercase'
    },
})
 
export default FormMultiCheckBox;