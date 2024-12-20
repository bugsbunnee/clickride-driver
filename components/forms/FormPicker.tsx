import React from "react";
import _ from "lodash";

import { useFormikContext } from "formik";

import Picker, { PickerProps } from "../lists/Picker";
import ErrorMessage from '@/components/forms/ErrorMessage';

interface Props extends Omit<PickerProps, 'onSelectItem' | 'selectedItem'> {
  name: string;
}

const AppFormPicker: React.FC<Props> = ({
  items,
  name,
  label,
  PickerItemComponent,
  placeholder,
  width,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <Picker
        label={label}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
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
