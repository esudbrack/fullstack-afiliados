import { TextField, TextFieldProps } from "@mui/material";
import { FieldProps } from "formik";
import * as React from "react";

export const MyField: React.FC<FieldProps & TextFieldProps> = ({
  field,
  placeholder,
  required,
  type,
}) => {
  return (
    <TextField
      {...field}
      label={placeholder}
      required={required}
      type={type}
      // fullWidth
      fullWidth
      margin="normal"
    />
  );
};
