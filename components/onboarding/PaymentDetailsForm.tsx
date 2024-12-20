import React, { useCallback, useMemo } from "react";
import _ from "lodash";

import { View, StyleSheet } from "react-native";
import * as yup from 'yup';

import { Form, FormField, FormPicker, SubmitButton } from '@/components/forms';
import { Button, Text } from "@/components/ui";
import { PickerItemModel } from '@/utils/models';
import { colors, styles as defaultStyles } from '@/constants'

interface FormValues {
    billingType: PickerItemModel | null;
    address: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
}

interface Props {
    onFinishStep: () => void;
    onPreviouStep: () => void;
}

const schema = yup.object<FormValues>().shape({
    billingType: yup.object({
        label: yup.string().required().label('Label'),
        value: yup.string().required().label('Value'),
    }).required().label('Billing type'),
    address: yup.string().min(3).required().label('Address'),
    accountName: yup.string().min(3).required().label('Account Name'),
    accountNumber: yup.string().length(10).required().label('Account Number'),
    bankName: yup.object({
        label: yup.string().required().label('Label'),
        value: yup.string().required().label('Value'),
    }).required().label('Bank name'),
});

const PaymentDetailsForm: React.FC<Props> = ({ onFinishStep, onPreviouStep }) => {
    const initialValues: FormValues = useMemo(() => {
        return {
            billingType: null,
            address: '',
            accountName: '',
            accountNumber: '',
            bankName: '',
        };
    }, []);

    const handleSubmit = useCallback((paymentDetails: FormValues) => {
        console.log(paymentDetails);
        onFinishStep();
    }, [onFinishStep]);

    return ( 
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Payment Details</Text>
                <Text style={styles.description}>We need your payment details to pay you</Text>
            </View>

            <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                <FormPicker
                    label='Billing type'
                    name="billingType" 
                    placeholder="Select billing type"
                    items={billingTypes}
                    width="100%"
                />

                <FormField 
                    autoCapitalize="sentences" 
                    name="address" 
                    label="Address" 
                    placeholder="Enter address"
                    keyboardType="default"
                />

                <FormField 
                    autoCapitalize="words"
                    label='Bank account holder name'
                    name="accountName" 
                    placeholder="John Doe"
                    keyboardType="name-phone-pad"
                    tip="Bank account name, person or company"
                />

                <FormField 
                    label='Bank account number'
                    name="accountNumber" 
                    placeholder="999900122"
                    keyboardType='numeric'
                    maxLength={10}
                />

                <FormPicker
                    label='Bank name'
                    name="bankName" 
                    placeholder="Select bank name"
                    items={bankNames}
                    width="100%"
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.flex}>
                        <Button
                            backgroundColor={colors.light.dew}
                            color={colors.light.primary}
                            label="Back" 
                            onPress={onPreviouStep} 
                        />
                    </View>

                    <View style={styles.flex}>
                        <SubmitButton label="Next" />
                    </View>
                </View>
            </Form>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: { 
        gap: 12,
        marginTop: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    description: { 
        textAlign: 'center', 
        fontSize: 10, 
        lineHeight: 15,
        color: colors.light.graySemi,
        fontFamily: defaultStyles.jakartaRegular.fontFamily,
        marginTop: 4,
    },
    flex: { flex: 1 },
   title: { 
        textAlign: 'center', 
        fontSize: 18, 
        lineHeight: 22,
        color: colors.light.dark,
        fontFamily: defaultStyles.jakartaBold.fontFamily,
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.light.dew,
        paddingBottom: 5,
        marginBottom: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const billingTypes = [
    {
        label: 'Individual',
        value: 'individual',
    },
    {
        label: 'Corporate',
        value: 'corporate'
    }
];

const bankNames = [
    {
        label: 'Kuda',
        value: 'kuda',
    }
];

export default PaymentDetailsForm;