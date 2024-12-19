import React from 'react';
import _ from 'lodash';

import { useFormikContext, FormikValues } from 'formik';
import TextInput, { AppTextInputProps } from '@/components/ui/TextInput';

interface Props extends AppTextInputProps {
	name: string;
}

const FormField: React.FC<Props> = ({ name, width,  ...otherProps }) => {
	const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

	return (
		<TextInput
			onBlur={() => setFieldTouched(name)}
			onChangeText={(text: string) => setFieldValue(name, text)}
			value={(values as FormikValues)[name]}
			width={width}
			error={_.get(touched, name) ? _.get(errors, name) : null}
			{...otherProps}
		/>
	);
};

export default FormField;
