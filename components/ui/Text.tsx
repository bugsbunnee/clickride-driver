import React from 'react';

import { Text, type TextProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { PropsWithChildren } from 'react';

import { styles as defaultStyles} from '@/constants';

interface Props extends PropsWithChildren, TextProps {
	style?: StyleProp<TextStyle>;
}

const AppText: React.FC<Props> = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[styles.default, style]} {...otherProps}>
        {children}
    </Text>
  );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: defaultStyles.jakartaRegular.fontFamily,
    },
});

export default AppText;