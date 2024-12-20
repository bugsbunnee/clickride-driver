import React from 'react';
import { useImage, Image, ImageStyle, ImageSource, ImageProps } from 'expo-image';
import { StyleProp, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, icons } from '../../constants';

interface Props extends ImageProps {
    src: ImageSource | string;
    style: StyleProp<ImageStyle>;
}

const AppImage: React.FC<Props> = ({ src, style, ...rest }) => {
  const image = useImage(src, {
    onError(error, retry) {
      console.error('Loading failed:', error.message);
    }
  });

  if (!image) {
    <View style={styles.preview}>
        <MaterialCommunityIcons name='camera' size={icons.SIZES.LARGE} color={colors.light.grayMid} />
    </View>
  }

  return (
    <Image
      source={image}
      style={style}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
    preview: { 
        width: "100%", 
        height: "100%", 
        backgroundColor: colors.light.grayLight, 
        borderRadius: 10 ,
    },
})

export default AppImage;