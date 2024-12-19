import React, { PropsWithChildren, useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import _ from 'lodash';

import { colors } from '@/constants';

interface Props extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Skeleton: React.FC<Props> = ({ children, style }) => {
    const dimensions = useWindowDimensions();
    const opacity = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: interpolate(opacity.value, [0, 1], [-dimensions.width, dimensions.width]) }],
    }));

    useEffect(() => {
        const timing = withTiming(1, { duration: 1000 });
        const repeat = withRepeat(timing, Infinity, false);
        
        opacity.set(repeat);
    }, []);

    return ( 
        <View style={[styles.container, style]}>
            <AnimatedLinearGradient
                colors={[colors.light.skeleton, colors.light.dewDark, colors.light.dewDark, colors.light.skeleton]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFill, animatedStyles]}
            />
                
            {children}
        </View>
     );
};

const styles = StyleSheet.create({
    container: { 
        backgroundColor: colors.light.skeleton,
        flex: 1,
    }
});

export default Skeleton;