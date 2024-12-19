import React from 'react';

import { StyleSheet, View } from 'react-native';
import { colors, styles as defaultStyles } from '@/constants';

import Text from '@/components/ui/Text';

interface ErrorMessageProps {
	errorMessage?: string;
	isVisible: boolean;
}

const ErrorMessage = (props: ErrorMessageProps) => {
	if (!props.isVisible || !props.errorMessage) return null;

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{props.errorMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 5,
	},
	text: {
		color: colors.light.danger,
		fontSize: 13,
		letterSpacing: 0.5,
		textAlign: 'left',
		fontFamily: defaultStyles.jakartaMedium.fontFamily,
	},
});

export default ErrorMessage;
