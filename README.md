# VR-wordle-front-end

## Introduction

This project is an attempt to recreate Wordle in VR using React Three Fiber and React XR. The most up to date release can be found deployed at [this link](https://wrdle.netlify.app/). This project has not been tested with a wide range of VR devices however it was built with Oculus Go in mind and should work as long as one right handed controller is connected. The game plays as normal Wordle, where an alphabet of blocks can be found on the table infront of the player, and a set of five pillars behind. To make a selection the player needs to place their chosen letters on each pedestal and then click the submit button. If any letters have been lost or displaced into unreachable locations the reset button can be used to drop all the letters back to the table. 

After a guess, the letters chosen that were not used will disappear from the game world and another guess can be made, until the correct word has been found or the player uses up all six guesses!

## Assets

* Mountain Model - https://www.cgtrader.com/free-3d-models/exterior/landscape/mountainwithtress
* Pedestal - https://sketchfab.com/3d-models/doric-twist-pedestal-7936fc9cbb6547459bfecb20910281ec
* Audio SFX - https://www.zapsplat.com/


## Technologies
* react-three/cannon @4.7.0
* react-three/drei @8.10.6
* react-three/fiber @7.0.26
* react-three/xr @3.4.0
* use-gesture/react @10.2.6
* date-fns @2.28.0
* react @17.0.2
* react-spring @9.4.3
* three @0.137.5
