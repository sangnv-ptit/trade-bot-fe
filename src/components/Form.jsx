import {
  Box,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useEffect, useState } from "react";

const Form = ({ handleClose }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/configs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => handleClose(data))
  };

  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/symbols`)
      .then((res) => res.json())
      .then((data) => {
        setSymbols(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box m="20px">
      <Header
        title="CREATE CONFIG"
        subtitle="Create a new trade config group"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                select
                label="Choose a symbol"
                onChange={handleChange}
                value={values.symbol}
                name="symbol"
                sx={{ gridColumn: "span 4" }}
              >
                {symbols.map((symbol) => (
                  <MenuItem value={symbol} key={symbol}>
                    {symbol}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label="Trade type"
                onChange={handleChange}
                value={values.tradeType}
                name="tradeType"
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="both">BOTH</MenuItem>
                <MenuItem value="long">LONG</MenuItem>
                <MenuItem value="short">SHORT</MenuItem>
              </TextField>
              <TextField
                fullWidth
                select
                label="Interval"
                onChange={handleChange}
                value={values.interval}
                name="interval"
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="1">1m</MenuItem>
                <MenuItem value="3">3m</MenuItem>
                <MenuItem value="5">5m</MenuItem>
                <MenuItem value="15">15m</MenuItem>
                <MenuItem value="30">30m</MenuItem>
                <MenuItem value="60">1H</MenuItem>
                <MenuItem value="120">2H</MenuItem>
                <MenuItem value="240">4H</MenuItem>
                <MenuItem value="360">6H</MenuItem>
                <MenuItem value="720">12H</MenuItem>
                <MenuItem value="D">1D</MenuItem>
              </TextField>
              <TextField
                fullWidth
                type="number"
                label="Order change"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oc}
                name="oc"
                error={!!touched.oc && !!errors.oc}
                helperText={touched.oc && errors.oc}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Extend"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.extend}
                name="extend"
                error={!!touched.extend && !!errors.extend}
                helperText={touched.extend && errors.extend}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 4" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">USDT</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Take profit"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tp}
                name="tp"
                error={!!touched.tp && !!errors.tp}
                helperText={touched.tp && errors.tp}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Auto Increase OC"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.autoIncreaseOc}
                name="autoIncreaseOc"
                error={!!touched.autoIncreaseOc && !!errors.autoIncreaseOc}
                helperText={touched.autoIncreaseOc && errors.autoIncreaseOc}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                select
                label="Reduce mode"
                onChange={handleChange}
                value={values.reduceMode}
                name="reduceMode"
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="highLow">HIGH LOW</MenuItem>
                <MenuItem value="close">CLOSE</MenuItem>
              </TextField>
              <TextField
                fullWidth
                type="number"
                label="Reduce take profit"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reduce}
                name="reduce"
                error={!!touched.reduce && !!errors.reduce}
                helperText={touched.reduce && errors.reduce}
                sx={{ gridColumn: "span 2" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  symbol: yup.string().required("required"),
  tradeType: yup.string().required("required"),
  interval: yup.string().required("required"),
  oc: yup.number().required("required"),
  extend: yup.number().required("required"),
  amount: yup.number().required("required"),
  tp: yup.number().required("required"),
});

const initialValues = {
  symbol: "",
  tradeType: "both",
  interval: "1",
  oc: "1",
  extend: "0",
  amount: "1000",
  tp: "50",
  autoIncreaseOc: "20",
  reduceMode: "highLow",
  reduce: 20,
};

export default Form;
