import React, { useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import TranslateIcon from "@material-ui/icons/Translate";
import { TranslationContext } from "../contexts/TranslationContext";

export const languages = [
  { name: "English", value: "en" },
  { name: "French", value: "fr" },
];

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SelectLanguage({}) {
  const { changeLanguage, selectedLocale } = useContext(TranslationContext);
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.margin}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TranslateIcon />
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={selectedLocale}
            onChange={({ target: { value } }) => changeLanguage(value)}
            input={<BootstrapInput />}
          >
            {languages.map(({ name, value }, index) => {
              return (
                <MenuItem key={index} value={value}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </FormControl>
    </div>
  );
}
