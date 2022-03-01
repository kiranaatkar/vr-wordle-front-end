import React, { useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./Components/Game";

export default function App() {
  const [username, setUsername] = useState("tom");

  return (
    <Routes>
      <Route
        path="/play"
        element={
          username ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Game username={username} />
            </Suspense>
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
    </Routes>
  );
}
