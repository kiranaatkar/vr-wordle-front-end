import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
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

export default function Homepage(props) {
  const [username, setUsername] = useState("");
  const [colourblind, setColourblind] = useState(false);

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  const submitUsername = () => {
    props.setColorBlind(colourblind);
    props.setUsername(username);
  };

  return (
    <div className="homepage">
      <ThemeProvider theme={theme}>
        <img src={"/wrdle-cropped.png"} alt="wrdle" data-testid="title-image" />
        <TextField
          data-testid="username-input"
          label="Username"
          variant="filled"
          value={username}
          onChange={onChange}
          style={{
            width: "20vw",
            marginBottom: "1vh",
            marginTop: "3vh",
            color: "#ffffff",
          }}
        />
        <Button
          data-testid="submit-button"
          variant="contained"
          type="submit"
          onClick={submitUsername}
          style={{ width: "20vw", marginBottom: "1vh" }}
          disabled={username.length === 0}
        >
          Submit{" "}
        </Button>
        <Button
          data-testid="random-username"
          style={{ width: "20vw", marginBottom: "18vh" }}
          variant="contained"
          onClick={() => setUsername(generateName())}
        >
          Generate Random Username{" "}
        </Button>
      </ThemeProvider>
      <FormGroup
        data-testid="colorblind-section"
        style={{
          background: "#5d9d8a",
          width: "20vw",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Switch
          data-testid="colorblind-switch"
          checked={colourblind}
          onChange={() => setColourblind(!colourblind)}
          color="warning"
        />
        <h3 style={{ color: "white" }}>Colourblind Mode</h3>
      </FormGroup>
    </div>
  );
}
