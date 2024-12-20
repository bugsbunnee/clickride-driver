import React, { useCallback, useMemo } from "react";
import _ from "lodash";

import { View, StyleSheet } from "react-native";
import * as yup from 'yup';

import { Form, FormUpload, SubmitButton } from '@/components/forms';
import { Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'

interface FormValues {
    inspection: string[];
}

interface Props {
    onFinishStep: () => void;
}

const schema = yup.object<FormValues>().shape({
    inspection: yup.array().length(1, "Please select exactly one file.").label('Vehicle inspection certificate'),
});

const VehicleInspectionDocumentsForm: React.FC<Props> = ({ onFinishStep }) => {
    const initialValues: FormValues = useMemo(() => {
        return {
            inspection: [],
        };
    }, []);

    const handleSubmit = useCallback((inspectionDocuments: FormValues) => {
        console.log(inspectionDocuments);
        onFinishStep();
    }, [onFinishStep]);

    return ( 
        <>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Vehicle inspection</Text>
                <Text style={styles.description}>We need your payment details to pay you</Text>
            </View>

            <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                <FormUpload
                    name="inspection"
                    label="Vehicle inspection certificate"
                    description="Kindly upload the inspection document given to you before the roadworthiness certificate was awarded" 
                />
               
                <View style={styles.buttonContainer}>
                    <SubmitButton label="Register as a driver" />
                </View>
            </Form>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: { 
        marginTop: 14,
    },
    description: { 
        textAlign: 'center', 
        fontSize: 10, 
        lineHeight: 15,
        color: colors.light.graySemi,
        fontFamily: defaultStyles.jakartaRegular.fontFamily,
        marginTop: 4,
    },
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

export default VehicleInspectionDocumentsForm;