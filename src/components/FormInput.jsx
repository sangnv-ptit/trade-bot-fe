import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const FormInput = ({ label, ...otherProps }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="group">
      <input {...otherProps} />
      {
        label &&
        <div className="form-input-label">
          {label}
        </div>
      }
    </div>
  );
};

export default FormInput;
