import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";
import "./style.scss";
const EntryText = ({ name, errMsg, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    fullWidth: true,
    variant: "outlined",
    ...field,
    ...otherProps,
  };
  // ...
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <div className="entry">
      <TextField {...configTextField} />
    </div>
  );
};

export default EntryText;
