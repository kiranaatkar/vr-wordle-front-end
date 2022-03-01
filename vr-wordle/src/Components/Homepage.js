import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { generateName } from "gamer-namer";
import "./Homepage.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#5d9d8a",
    },
    secondary: {
      main: "#3f51b5",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});

export default function Homepage() {
  const [username, setUsername] = useState();
  const [colourblind, setColourblind] = useState(false);

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="homepage">
      <ThemeProvider theme={theme}>
        <img src={"/wrdle-cropped.png"} alt="wrdle" />
        <TextField
          label="Username"
          variant="filled"
          value={username}
          onChange={onChange}
          style={{ width: "20vw", margin: "5vh", color: "#ffffff" }}
        />
        <Button variant="contained" onClick={() => setUsername(generateName())}>
          Generate Random Username{" "}
        </Button>
      </ThemeProvider>
      <FormGroup
        style={{
          marginTop: "4vh",
          background: "white",
          width: "20vw",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => setColourblind(!colourblind)}
              style={{ marginLeft: "3vw" }}
            />
          }
          label="COLOURBLIND MODE"
        />
      </FormGroup>
    </div>
  );
}
