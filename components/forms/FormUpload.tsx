import React from "react";
import _ from 'lodash';

import { useFormikContext } from "formik";
import { DocumentUpload } from "@/utils/models";

import ErrorMessage from "./ErrorMessage";
import Upload, { UploadProps } from "../lists/Upload";

interface Props extends Pick<UploadProps, 'label' | 'description' | 'supportedMimeTypes'>{
  name: string;
}

const FormUpload: React.FC<Props> = ({ name, label, description, supportedMimeTypes }) => {
  const { errors, setFieldValue, setFieldTouched, touched, values } = useFormikContext<Record<string, DocumentUpload[]>>();
  const images = values[name];

  const handleAdd = (image: DocumentUpload) => {
    setFieldTouched(name);
    setFieldValue(name, [...images, image]);
  };

  const handleRemove = (uri: string) => {
    setFieldValue(name, images.filter((image) => image.uri !== uri));
  };

  return (
    <>
      <Upload
        label={label}
        description={description}
        supportedMimeTypes={supportedMimeTypes}
        imageUris={images}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />

      <ErrorMessage 
        errorMessage={errors[name] as string} 
        isVisible={touched[name] as unknown as boolean} 
      />
    </>
  );
};

export default FormUpload;
