import React, { PropsWithChildren, useCallback } from 'react';
import _ from 'lodash';

import { useFormikContext } from 'formik';

import CheckBox from '../ui/CheckBox';
import ErrorMessage from './ErrorMessage';


interface Props extends PropsWithChildren {
	name: string;
}

const FormField: React.FC<Props> = ({ name,  ...otherProps }) => {
	const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();
    const value = _.get(values, name);

    const handleFieldChange = useCallback(() => {
        setFieldValue(name, !value, true);
        setFieldTouched(name);
    }, [value]);

	return (
		<>
            <CheckBox
                onChange={handleFieldChange}
                isChecked={value}
                {...otherProps}
            />

            <ErrorMessage
                errorMessage={_.get(errors, name)} 
                isVisible={_.get(touched, name)} 
            />
        </>
	);
};

export default FormField;
