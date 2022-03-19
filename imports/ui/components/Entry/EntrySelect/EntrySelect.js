import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";

const EntrySelect = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const changeHandler = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };
  const config = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: changeHandler,
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return (
    <div className="entry">
      <TextField {...config}>
        {Object.keys(options).map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {options[item]}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  );
};

export default EntrySelect;
