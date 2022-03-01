import React, { useState, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Game from './Components/Game';
import Homepage from './Components/Homepage';
import LoadingScreen from './Components/loadingScreen.js';

export default function App() {
  const [username, setUsername] = useState('');
  const [colorBlind, setColorBlind] = useState(false);

  console.log(username, colorBlind);

  return (
    <Routes>
      <Route
        path='/play'
        element={
          username ? (
            <Suspense fallback={<LoadingScreen />}>
              <Game username={username} colorBlind={colorBlind} />
            </Suspense>
          ) : (
            <Navigate replace to='/' />
          )
        }
      />
      <Route
        path='/'
        element={
          !username ? (
            <Homepage setUsername={setUsername} setColorBlind={setColorBlind} />
          ) : (
            <Navigate replace to='/play' />
          )
        }
      />
    </Routes>
  );
}
