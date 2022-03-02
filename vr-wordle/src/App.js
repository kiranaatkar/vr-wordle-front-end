import React, { useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./Components/Game";
import Homepage from "./Components/Homepage";
import LoadingScreen from "./Components/loadingScreen.js";
import { Stats } from "@react-three/drei";
import "./App.css";

// FOR TESTING RESULTS COMPONENT
// import Results from "./Components/ResultsDisplay";

export default function App() {
  const [username, setUsername] = useState("");
  const [colorBlind, setColorBlind] = useState(false);
  const [gameEnded, endGame] = useState(false);

  console.log(username, colorBlind, gameEnded);

  return (
    <div className="App">
      <Routes>
        {/* <Route
          path="/results"
          element={
            username && gameEnded ? (
              <Results answer="nasty" userScore={3} />
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}
        <Route
          path="/play"
          element={
            username.length > 1 ? (
              <Suspense fallback={<LoadingScreen />}>
                <Stats
                  showPanel={0} // Start-up panel (default=0)
                  className="stats" // Optional className to add to the stats container dom element
                />
                <Game
                  username={username}
                  colorBlind={colorBlind}
                  endGame={(state) => endGame(state)}
                />
              </Suspense>
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            !username ? (
              <Homepage
                setUsername={setUsername}
                setColorBlind={setColorBlind}
              />
            ) : (
              <Navigate replace to="/play" />
            )
          }
        />
      </Routes>
    </div>
  );
}
