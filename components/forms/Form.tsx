import React, { PropsWithChildren } from 'react';
import { Formik, FormikHelpers, FormikValues } from 'formik';

interface FormProps extends PropsWithChildren {
	initialValues: FormikValues;
	onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
	validationSchema: unknown;
}

const Form: React.FC<FormProps> = ({
	initialValues,
	onSubmit,
	validationSchema,
	children,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{() => <>{children}</>}
		</Formik>
	);
};

export default Form;
