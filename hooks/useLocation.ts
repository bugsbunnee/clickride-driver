import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';

import { getCoords } from '@/utils/lib';
import { TASKS } from '@/constants/app';

import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

interface Coords extends Location.LocationObjectCoords {
  latitudeDelta: number;
  longitudeDelta: number;
}

interface TaskResult { 
  data: { locations: Location.LocationObjectCoords[]; };
  error: TaskManager.TaskManagerError | null;
}

function useLocation() {
  const [coords, setCoords] = useState<Coords>();
  const [granted, setGranted] = useState(false);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'android' && !Device.isDevice) return;
  
    const foregroundPermission = await Location.requestForegroundPermissionsAsync();
    if (!foregroundPermission.granted) return;
    
    const fetchedLocation = await Location.getCurrentPositionAsync();
    setCoords(getCoords(fetchedLocation.coords));

    if (process.env.NODE_ENV === 'production') {
      const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
      if (!backgroundPermission.granted) return;

      await Location.startLocationUpdatesAsync(TASKS.LOCATION_UPDATES, {
        accuracy: Location.Accuracy.Balanced,
      });
    }

    setGranted(true);
  }, []);

  useEffect(() => {
    requestPermission();
  }, []);

  return { coords, granted, requestPermission };
}

TaskManager.defineTask(TASKS.LOCATION_UPDATES, ({ data, error }: TaskResult): any => {
 if (error) {
   return;
 }
 
 console.log('Received new locations', data.locations);
});

export default  useLocation;
