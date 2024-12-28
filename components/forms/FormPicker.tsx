import React, { useCallback } from "react";
import _ from "lodash";

import { useFormikContext } from "formik";

import Picker, { PickerProps } from "../lists/Picker";
import ErrorMessage from '@/components/forms/ErrorMessage';
import { PickerItemModel } from "@/utils/models";

interface Props extends Omit<PickerProps, 'onSelectItem' | 'selectedItem'> {
  name: string;
}

const AppFormPicker: React.FC<Props> = ({
  items,
  name,
  icon,
  label,
  PickerItemComponent,
  placeholder,
  width,
}) => {
  const { errors, setFieldValue, setFieldTouched, touched, values } = useFormikContext();

  const handleItemSelect = useCallback((item: PickerItemModel) => {
    setFieldTouched(name);
    setFieldValue(name, item);
  }, []);

  return (
    <>
      <Picker
        label={label}
        items={items}
        icon={icon}
        onSelectItem={handleItemSelect}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={_.get(values, name)}
        width={width}
      />

      <ErrorMessage
        errorMessage={_.get(errors, name)} 
        isVisible={_.get(touched, name)} 
      />
    </>
  );
}

export default AppFormPicker;
