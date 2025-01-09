import React, { useMemo } from "react";
import _ from "lodash";

import { PickerItemModel } from '@/utils/models';

import { FormPicker } from '@/components/forms';
import { ActivityIndicator } from "@/components/ui";
import { useGetCitiesQuery, useGetStatesQuery } from "@/store/api/services";
import { useFormikContext } from "formik";

const TripLocations: React.FC = () => {
    const { values } = useFormikContext();

    const originState = useMemo(() => {
        const origin =  _.get(values, 'origin') as unknown as PickerItemModel | null;
        return origin ? origin.value.toString() : '';
    }, [values]);

    const destinationState = useMemo(() => {
        const destination =  _.get(values, 'destination') as unknown as PickerItemModel | null;
        return destination ? destination.value.toString() : '';
    }, [values]);

    const { data: states = [], isLoading: isFetchingStates } = useGetStatesQuery();
    const { data: originCities = [], isLoading: isFetchingOriginCities } = useGetCitiesQuery(originState, { refetchOnMountOrArgChange: true });
    const { data: destinationCities = [], isLoading: isFetchingDestinationCities } = useGetCitiesQuery(destinationState, { refetchOnMountOrArgChange: true });
    
    return ( 
        <>
            <ActivityIndicator visible={isFetchingStates || isFetchingOriginCities || isFetchingDestinationCities} />

            <FormPicker
                name="origin" 
                label='From' 
                placeholder='Lagos'
                items={states}
                width="100%"
            />
            
            <FormPicker
                name="originCity" 
                label='From (City)' 
                placeholder='Lekki'
                items={originCities}
                width="100%"
            />
            
            <FormPicker
                name="destination" 
                label='To' 
                placeholder='Edo'
                items={states}
                width="100%"
            />

            <FormPicker
                name="destinationCity" 
                label='To (City)' 
                placeholder='Benin'
                items={destinationCities}
                width="100%"
            />
        </>
     );
};
 
export default TripLocations;