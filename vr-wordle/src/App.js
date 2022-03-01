import React, { useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./Components/Game";

export default function App() {
  const [username, setUsername] = useState("tom");
  const [colorBlind, setColorBlind] = useState(false);

  return (
    <Routes>
      <Route
        path="/play"
        element={
          username ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Game username={username} colorBlind={colorBlind} />
            </Suspense>
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
    </Routes>
  );
}
