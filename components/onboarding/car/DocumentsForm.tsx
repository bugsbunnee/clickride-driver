import React, { useCallback, useMemo } from "react";
import _ from "lodash";

import { View, StyleSheet } from "react-native";
import { FormikHelpers } from "formik";

import * as yup from 'yup';

import { Form, FormError, FormUpload, SubmitButton } from '@/components/forms';
import { ActivityIndicator, Button, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from '@/constants'
import { useUpdateVehicleDocumentsMutation } from "@/store/api/onboarding";
import { getFieldErrorsFromError, getMessageFromError } from "@/utils/lib";
import { DocumentUpload } from "@/utils/models";

import storage from "@/utils/storage";

interface FormValues {
    license: DocumentUpload[];
    display: DocumentUpload[];
    interior: DocumentUpload[];
    exterior: DocumentUpload[];
    ownership: DocumentUpload[];
    roadWorthiness: DocumentUpload[];
    insurance: DocumentUpload[];
    lasrra: DocumentUpload[];
    lasdri: DocumentUpload[];
}

interface Props {
    onPreviouStep: () => void;
}

const schema = yup.object<FormValues>().shape({
    license: yup.array().length(1, "Please select exactly one file.").label('License / NIN'),
    display: yup.array().length(1, "Please select exactly one file.").label('Profile picture'),
    interior: yup.array().length(1, "Please select exactly one file.").label('Interior photo'),
    exterior: yup.array().length(1, "Please select exactly one file.").label('Exterior photo'),
    ownership: yup.array().length(1, "Please select exactly one file.").label('Proof of car ownership'),
    roadWorthiness: yup.array().length(1, "Please select exactly one file.").label('Certificate of roadworthiness'),
    insurance: yup.array().length(1, "Please select exactly one file.").label('Vehicle insurance certificate'),
    lasrra: yup.array().length(1, "Please select exactly one file.").label('LASRRA card'),
    lasdri: yup.array().length(1, "Please select exactly one file.").label('LASDRI card'),
});

const DocumentsForm: React.FC<Props> = ({ onPreviouStep }) => {
    const [updateVehicleDocuments, { isLoading, error }] = useUpdateVehicleDocumentsMutation();

    const initialValues: FormValues = useMemo(() => {
        return {
            license: [],
            display: [],
            interior: [],
            exterior: [],
            ownership: [],
            roadWorthiness: [],
            insurance: [],
            lasrra: [],
            lasdri: [],
        };
    }, []);

    const handleSubmit = useCallback(async (documents: FormValues, helpers: FormikHelpers<FormValues>) => {
        const formData = new FormData();

        for (const document in documents) {
            const file = documents[document as keyof typeof documents][0]
            
            console.log(document, file)
            formData.append(document, {
                name: file.name,
                type: file.type,
                uri: file.uri,
            } as any)
        }

        try {
            const response = await updateVehicleDocuments(formData).unwrap();
            storage.storeSession(response);
        } catch (error) {
            const fieldErrors = getFieldErrorsFromError(error);
            if (fieldErrors) helpers.setErrors(fieldErrors);
        }
    }, [updateVehicleDocuments]);

    return ( 
       <>
            <ActivityIndicator visible={isLoading} />

            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Documents</Text>
                    <Text style={styles.description}>We're legally required to ask you for some documents to sign you up as a driver. Scans are accepted</Text>
                </View>

                <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
                    <FormUpload
                        name="license"
                        label="Driver's license for Cars / NIN for Motorbikes and Tricycles"
                        description="Kindly upload your Driver license if you're a car driver, or upload your National ID (NIN) document if you’re a Motorbike or Tricycle driver" 
                    />
                    
                    <FormUpload
                        name="display"
                        label="Driver's profile photo"
                        description="Kindly upload a clear passport photo of your self." 
                    />
                
                    <FormUpload
                        name="interior"
                        label="Interior photo of your car"
                        description="Kindly upload a clear interior photo of your car" 
                    />
                
                    <FormUpload
                        name="exterior"
                        label="Exterior photo of your car"
                        description="Kindly upload a clear exterior photo of your car, that captures the plate number" 
                    />
                    
                    <FormUpload
                        name="ownership"
                        label="Proof of car ownership certificate"
                        description="Kindly upload the proof your car ownership certificate" 
                    />
                
                    <FormUpload
                        name="roadWorthiness"
                        label="Certificate of roadworthiness"
                        description="Kindly upload roadworthiness certificate" 
                    />
                    
                    <FormUpload
                        name="insurance"
                        label="Vehicle insurance certificate"
                        description="Kindly upload you third party or comprehensive insurance certificate" 
                    />
                
                    <FormUpload
                        name="lasrra"
                        label="LASRRA card"
                        description="Residence card issued by the Lagos State Resident Registration Agency. Visit: LASSRA to get" 
                    />
                    
                    <FormUpload
                        name="lasdri"
                        label="LASDRI card"
                        description="Lagos Drivers Institute ReCertification Card. Visit LASDRI to get" 
                    />

                    <FormError error={getMessageFromError(error)} />

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
            </View>
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

export default DocumentsForm;