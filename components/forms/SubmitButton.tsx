import React from 'react';
import { useFormikContext } from 'formik';

import Button from '@/components/ui/Button';

interface SubmitButtonProps {
	label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
	const { isValid, handleSubmit } = useFormikContext();

	return <Button disabled={!isValid} label={label} onPress={handleSubmit} />;
};

export default SubmitButton;
