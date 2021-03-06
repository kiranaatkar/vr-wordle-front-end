import React, { useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./Components/Game";
import Homepage from "./Components/Homepage";
import LoadingScreen from "./Components/loadingScreen.js";
import { Stats } from "@react-three/drei";
import "./App.css";
import ResultsScreen from "./Components/ResultsScreen";

export default function App() {
  const [username, setUsername] = useState("");
  const [colorBlind, setColorBlind] = useState(false);
  const [gameEnded, endGame] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/results"
          element={
            username && gameEnded ? (
              <ResultsScreen
                answer={answer}
                userScore={score + 1}
                gameTime={endTime - startTime}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/play"
          element={
            username ? (
              gameEnded ? (
                <Navigate replace to="/results" />
              ) : (
                <Suspense fallback={<LoadingScreen />}>
                  <Stats
                    showPanel={0} // Start-up panel (default=0)
                    className="stats" // Optional className to add to the stats container dom element
                  />
                  <Game
                    username={username}
                    colorBlind={colorBlind}
                    startTime={startTime}
                    endGame={(state) => endGame(state)}
                    setAnswer={(answer) => setAnswer(answer)}
                    setScore={(score) => setScore(score)}
                    setEndTime={(number) => setEndTime(number)}
                  />
                </Suspense>
              )
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
                setStartTime={() => setStartTime(Date.now())}
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
