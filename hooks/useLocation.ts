import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { getCoords } from '@/utils/lib';

import * as Device from 'expo-device';
import * as Location from 'expo-location';

interface Coords extends Location.LocationObjectCoords {
  latitudeDelta: number;
  longitudeDelta: number;
}

function useLocation() {
  const [coords, setCoords] = useState<Coords>();
  const [granted, setGranted] = useState(false);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'android' && !Device.isDevice) return;
  
    const permission = await Location.requestForegroundPermissionsAsync();
    const isGranted = permission.status === 'granted';
    setGranted(isGranted);
  
    if (!isGranted) return;
    
    const fetchedLocation = await Location.getCurrentPositionAsync();
    setCoords(getCoords(fetchedLocation.coords));
  }, []);

  useEffect(() => {
    requestPermission();
  }, []);

  return { coords, granted, requestPermission };
}

export default  useLocation;
