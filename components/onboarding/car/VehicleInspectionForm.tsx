import React, { useCallback, useMemo } from "react";
import _ from "lodash";

import { FormikHelpers } from "formik";
import { View, StyleSheet } from "react-native";
import * as yup from 'yup';

import { Form, FormError, FormUpload, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'
import { DocumentUpload } from "@/utils/models";
import { useUpdateVehicleInspectionMutation } from "@/store/api/onboarding";
import { getFieldErrorsFromError, getMessageFromError } from "@/utils/lib";

import storage from "@/utils/storage";

interface FormValues {
    inspection: DocumentUpload[];
}

const schema = yup.object<FormValues>().shape({
    inspection: yup.array().length(1, "Please select exactly one file.").label('Vehicle inspection certificate'),
});

const VehicleInspectionDocumentsForm: React.FC = () => {
    const [updateVehicleInspection, { isLoading, error }] = useUpdateVehicleInspectionMutation();

    const initialValues: FormValues = useMemo(() => {
        return {
            inspection: [],
        };
    }, []);

    const handleSubmit = useCallback(async (inspectionDocuments: FormValues, helpers: FormikHelpers<FormValues>) => {
        const inspection = inspectionDocuments.inspection[0];
        const formData = new FormData();

        formData.append('inspection', {
            uri: inspection.uri,
            type: inspection.type,
            name: inspection.name,
        } as any);

        try {
            const response = await updateVehicleInspection(formData).unwrap();
            storage.storeSession(response);
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [updateVehicleInspection]);

    return ( 
        <>
            <ActivityIndicator visible={isLoading} />
           
            <View style={styles.content}>
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
                
                    <FormError error={getMessageFromError(error)} />

                    <View style={styles.buttonContainer}>
                        <SubmitButton label="Register as a driver" />
                    </View>
                </Form>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: { 
        marginTop: 14,
    },
    content: {
        flex: 1,
        paddingHorizontal: 23,
        paddingBottom: 20,
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