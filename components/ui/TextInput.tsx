import React, { useEffect, useState } from 'react';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { TextInput, StyleSheet, View, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData, DimensionValue, TouchableOpacity, StyleProp, ViewStyle, Keyboard } from 'react-native';
import { Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { colors, icons, styles as defaultStyles } from '@/constants';
 
import ErrorMessage from '@/components/forms/ErrorMessage';
import Text from './Text';

export interface AppTextInputProps extends TextInputProps {
	icon?: string;
	width?: DimensionValue;
	showClearOption?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	label?: string;
	error?: string;
	tip?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
	width = '100%',
	showClearOption = false,
	containerStyle,
	error,
	label,
	icon,
	tip,
	onBlur,
	onFocus,
	...otherProps
}) => {
	const focusValue = useSharedValue<number>(0);
	const [isVisible, setVisible] = useState(true);

	const animatedStyle = useAnimatedStyle(() => ({
		borderColor: interpolateColor(focusValue.value, [0, 1], [colors.light.dew, colors.light.primary])
	}));

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		if (onBlur) onBlur(e);
		Keyboard.dismiss();

		const timing = withTiming(0, { duration: 500 });
		focusValue.set(timing);
	};

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		if (onFocus) onFocus(e);

		const timing = withTiming(1, { duration: 500 });
		focusValue.set(timing);
	};

	useEffect(() => {
		setVisible(!otherProps.secureTextEntry);
	}, [otherProps.secureTextEntry]);

	return (
		<View style={[styles.containerMargin, { width }]}>
			{label && <Text style={styles.label}>{label}</Text>}

			<Animated.View style={[styles.container, { width }, animatedStyle, containerStyle]}>
				{icon ? (
					<View style={styles.iconContainer}>
						<SimpleLineIcons 
							name={icon as any} 
							size={icons.SIZES.SMALL} 
							color={colors.light.gray} />
					</View>
				) : null}

				<TextInput
					{...otherProps}
					style={[styles.text, otherProps.style]}
					placeholderTextColor={colors.light.placeholder}
					selectionColor={colors.light.primary}
					onFocus={handleFocus}
					onBlur={handleBlur}
					secureTextEntry={!isVisible}
				/>

				{otherProps.secureTextEntry ? (
					<TouchableOpacity style={styles.iconContainer} onPress={() => setVisible((prev) => !prev)}>
						<Octicons 
							name={isVisible ? 'eye' : 'eye-closed'}
							size={icons.SIZES.NORMAL} 
							color={colors.light.black} />
					</TouchableOpacity>
				) : null}
				
				{otherProps.value && showClearOption ? (
					<TouchableOpacity style={styles.iconContainer} onPress={() => otherProps?.onChangeText?.('')}>
						<Octicons 
							name='x-circle'
							size={icons.SIZES.SMALL} 
							color={colors.light.black} />
					</TouchableOpacity>
				) : null}
			</Animated.View>

			{tip ? <Text style={styles.tip}>{tip}</Text> : null}

			<ErrorMessage isVisible={!!error} errorMessage={error} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 50,
		borderColor: colors.light.dew,
		backgroundColor: colors.light.dew,
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
		paddingHorizontal: 16,
	},
	containerMargin: {
		marginBottom: 18,
	},
	iconContainer: {
		marginRight: 10,
	},
	label: {
		color: colors.light.dark,
		fontSize: 15,
		lineHeight: 24,
		marginBottom: 6,
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
	},
	text: {
		color: colors.light.dark,
		fontSize: 15,
		letterSpacing: 0.25,
		flex: 1,
		lineHeight: 20,
		fontFamily: defaultStyles.jakartaMedium.fontFamily,
	},
	tip: {
		color: colors.light.gray,
		fontSize: 10,
		letterSpacing: 0.25,
		lineHeight: 20,
		marginTop: 8,
		fontFamily: defaultStyles.jakartaMedium.fontFamily,
	},
});

export default AppTextInput;
