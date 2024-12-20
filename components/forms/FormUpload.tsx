import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import Upload, { UploadProps } from "../lists/Upload";

interface Props extends Pick<UploadProps, 'label' | 'description' | 'supportedMimeTypes'>{
  name: string;
}

const FormUpload: React.FC<Props> = ({ name, label, description, supportedMimeTypes }) => {
  const { errors, setFieldValue, setFieldTouched, touched, values } = useFormikContext<Record<string, string[]>>();
  const imageUris = values[name];

  const handleAdd = (uri: string) => {
    setFieldTouched(name);
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri: string) => {
    setFieldValue(name, imageUris.filter((imageUri) => imageUri !== uri));
  };

  return (
    <>
      <Upload
        label={label}
        description={description}
        supportedMimeTypes={supportedMimeTypes}
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />

      <ErrorMessage errorMessage={errors[name] as string} isVisible={touched[name] as boolean} />
    </>
  );
};

export default FormUpload;
