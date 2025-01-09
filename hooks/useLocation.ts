import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';

import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import _ from 'lodash';

import { TASKS } from '@/constants/app';
import { getCoords } from '@/utils/lib';
import { useUpdateLocationMutation } from '@/store/api/services';


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
  const [updateLocation, result] = useUpdateLocationMutation();

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'android' && !Device.isDevice) return;
  
    const foregroundPermission = await Location.requestForegroundPermissionsAsync();
    if (!foregroundPermission.granted) return;
    
    const fetchedLocation = await Location.getCurrentPositionAsync();
    setCoords(getCoords(fetchedLocation.coords));

    if (process.env.NODE_ENV === 'production') {
      const backgroundPermission = await Location.requestBackgroundPermissionsAsync();
      if (!backgroundPermission.granted) return;

      await Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced }, (location) => {
        setCoords(getCoords(location.coords));
      });
    }

    setGranted(true);
  }, []);

  const handleLocationUpdate = useCallback(async () => {
    if (!coords) return;

    try {
      const coordinates = _.pick(coords, ['latitude', 'longitude']);
      await updateLocation(coordinates).unwrap();
    } catch (error) {
      // silent error
    }
  }, [coords, updateLocation]);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    handleLocationUpdate();
  }, [handleLocationUpdate]);

  return { coords, granted, requestPermission };
}

TaskManager.defineTask(TASKS.LOCATION_UPDATES, ({ data, error }: TaskResult): any => {
 if (error) {
   return;
 }
 
 console.log('Received new locations', data.locations);
});

export default  useLocation;
