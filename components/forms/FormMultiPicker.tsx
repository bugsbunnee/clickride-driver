import React, { useCallback } from "react";
import _ from "lodash";

import { useFormikContext } from "formik";
import { PickerItemModel } from "@/utils/models";

import MultiPicker, { MultiPickerProps } from "../lists/MultiPicker";
import ErrorMessage from '@/components/forms/ErrorMessage';

interface Props extends Omit<MultiPickerProps, 'onSelectItem' | 'selectedItems'> {
  name: string;
}

const AppFormMultiPicker: React.FC<Props> = ({
  items,
  name,
  label,
  PickerItemComponent,
  placeholder,
  width,
}) => {
  const { errors, setFieldValue, setFieldTouched, touched, values } = useFormikContext();
  const value: PickerItemModel[] = _.get(values, name);

  const handleToggleItem = useCallback((item: PickerItemModel) => {
    setFieldTouched(name);

    if (value.includes(item)) setFieldValue(name, value.filter((option) => option.value !== item.value));
    else setFieldValue(name, [...value, item]);
  }, [value]);

  return (
    <>
      <MultiPicker
        label={label}
        items={items}
        onSelectItem={handleToggleItem}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItems={_.get(values, name)}
        width={width}
      />

      <ErrorMessage
        errorMessage={_.get(errors, name)} 
        isVisible={_.get(touched, name)} 
      />
    </>
  );
}

export default AppFormMultiPicker;
