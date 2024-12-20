import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import { Image, Text } from '@/components/ui';
import { colors, icons, styles as defaultStyles } from '@/constants';

export interface UploadProps {
    label: string;
    description: string;
    imageUris: string[];
    onAddImage: (imageUri: string) => void;
    onRemoveImage: (imageUri: string) => void;
}

const Upload: React.FC<UploadProps> = ({ description, label, imageUris, onAddImage, onRemoveImage }) => {
    const scrollView = useRef<ScrollView>(null);

    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const { granted }= await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library.");
    };

    const addImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 1,
            });
    
            if (!result.canceled) onAddImage(result.assets[0].uri);
        } catch (error) {
            console.log("Error reading an image", error);
        }
    };

    const removeImage = (uri: string) => {
        Alert.alert("Delete", "Are you sure you want to delete this image?", [
            { text: "Yes", onPress: () => onRemoveImage(uri) },
            { text: "No" },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.description}>{description}</Text>
            
            <TouchableWithoutFeedback onPress={addImage}>
                <View style={styles.upload}>
                    <Text style={styles.text}>Upload file</Text>

                    <MaterialCommunityIcons
                        name="upload"
                        size={icons.SIZES.SMALL}
                        color={colors.light.gray}
                    />
                </View>
            </TouchableWithoutFeedback>

            <ScrollView
                ref={scrollView}
                horizontal
                onContentSizeChange={() => scrollView.current?.scrollToEnd()}
            >
                <View style={styles.list}>
                    {imageUris.map((uri) => (
                        <TouchableOpacity key={uri} style={styles.preview} onPress={() => removeImage(uri)}>
                            <View style={styles.imageContainer}>
                                <Image src={uri} style={styles.image} />
                            </View>
                            
                            <View style={styles.delete}>
                                <MaterialCommunityIcons 
                                    name='trash-can' 
                                    size={icons.SIZES.SMALL} 
                                    color={colors.light.danger} 
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container: { 
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA'
  },
  description: {
    color: colors.light.gray,
    fontSize: 10,
    lineHeight: 13,
    fontFamily: defaultStyles.jakartaRegular.fontFamily,
  },
  delete: { 
    width: 24, 
    height: 24,
    backgroundColor: colors.light.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 0
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    height: "100%",
    borderRadius: 999
  },
  list: {
    flexDirection: "row",
    paddingBottom: 11,
  },
  preview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 110,
    height: 110,
    borderRadius: 110,
    borderWidth: 2,
    backgroundColor: colors.light.borderLight,
    borderColor: colors.light.grayMid,
  },
  upload: {
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    marginVertical: 11,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: colors.light.dew,
  },
  label: {
    color: colors.light.dark,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: defaultStyles.jakartaSemibold.fontFamily,
    marginBottom: 5
  },
  text: {
    color: colors.light.placeholder,
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.25,
    flex: 1,
    fontFamily: defaultStyles.jakartaSemibold.fontFamily,
  },
});

export default Upload;
