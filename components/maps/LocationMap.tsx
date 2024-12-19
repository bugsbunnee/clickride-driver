import React, { useEffect, useRef } from 'react';
import MapView, { CameraZoomRange, MapMarkerProps, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import _ from 'lodash';

import { Platform, StyleSheet, View } from 'react-native';
import { Image, Skeleton } from '../ui';

import useLocation from '@/hooks/useLocation';

interface Props {
    markers?: MapMarkerProps[];
}

const CURRENT_USER_IDENTIFIER = 'current-user';

const cameraRangeOptions: CameraZoomRange = {
    minCenterCoordinateDistance: 400,
    animated: true
};

const LocationMap: React.FC<Props> = ({ markers = [] }) => {
    const location = useLocation();
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if (location.coords && markers.length > 0 && mapRef.current) {
            const markerIdentifiers = markers.map((marker) => marker.identifier).concat([CURRENT_USER_IDENTIFIER]) as string[];

            mapRef.current.fitToSuppliedMarkers(markerIdentifiers, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
            });
        }
    }, [location, markers]);

    if (location.coords) {
        return ( 
            <View style={styles.container}>
                <MapView 
                    ref={mapRef}
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined} 
                    style={styles.map}
                    zoomEnabled
                    initialRegion={location.coords}
                    cameraZoomRange={cameraRangeOptions}
                >
                    {markers.length > 0 && markers.map((marker) => (
                        <Marker
                            key={marker.title}
                            identifier={marker.identifier}
                            image={marker.image}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}

                    <Marker
                        coordinate={location.coords}
                        identifier={CURRENT_USER_IDENTIFIER}
                        title="You"
                        description="Your current location"
                        image={require("@/assets/images/marker.png")}
                    />
                </MapView>
            </View>
        );
    }

    return (
        <Skeleton style={styles.skeleton}>
            <Image 
                src={require("@/assets/images/marker.png")}
                style={styles.pin}
                contentFit='contain' 
            />
        </Skeleton>
    );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  pin: { width: 30, height: 42 },
  skeleton: { justifyContent: 'center', alignItems: 'center' },
});

export default LocationMap;