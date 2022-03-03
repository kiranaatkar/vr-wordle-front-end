# VR-wordle-front-end

## Table of Contents

- [Introduction](#introduction)
- [Gameplay](#gameplay)
- [Assets](#assets)
- [Technologies](#technologies)
- [Contributors](#contributors)

## Introduction

This project is an attempt to recreate Wordle in VR using React Three Fiber and React XR. The most up to date release can be found deployed at [this link](https://wrdle.netlify.app/). This project has not been tested with a wide range of VR devices however it was built with Oculus Go in mind and should work as long as one right handed controller is connected. The game plays as normal Wordle, where an alphabet of blocks can be found on the table infront of the player, and a set of five pillars behind. To make a selection the player needs to place their chosen letters on each pedestal and then click the submit button. If any letters have been lost or displaced into unreachable locations the reset button can be used to drop all the letters back to the table. 
After a guess, the letters chosen that were not used will disappear from the game world and another guess can be made, until the correct word has been found or the player uses up all six guesses!

## Gameplay

### Landing Page 

<img width="1440" alt="Screenshot 2022-03-03 at 15 23 50" src="https://user-images.githubusercontent.com/94084605/156598252-3645c2d6-4bd8-47c7-810f-c5cbaac59560.png">
The first page the user will be directed to will be the Homepage, where users can enter a Username or have one randomly generated. The user can also choose to toggle Colour-Blind Mode, which changes the colour-palette for the grid to be more accessible for those who are colour-blind.
After submitting a username, the page will begin to load the app, after which an ```Enter VR``` prompt will appear at the bottom of the page, allowing the user to enter a WebXR-powered interactive experience.

### Main Game

<img width="1432" alt="Screenshot 2022-03-03 at 13 21 21" src="https://user-images.githubusercontent.com/94084605/156599321-ae89e2b3-d7f2-4d52-bc8d-559e70efb5e4.png">

Entering VR here allows you to play the game fully. Pick up the letters and place them on the pedestals in front of you. Once your guess has been constructed, point at the ```SUBMIT``` button on your right and click select to check your guess against the day's answer. If you lose a few blocks or they get out of reach, hit the red ```RESET``` to your left to respawn the current pool of letters. When the game ends, either after you guess correctly or run out of guesses, the app will close the current XR session and redirect you to the results page, where you can see how you did compared to other users.

<img width="1440" alt="Screenshot 2022-03-03 at 15 24 37" src="https://user-images.githubusercontent.com/94084605/156601064-3f9171be-9a52-4d91-8614-e5226695e60b.png">
<img width="1440" alt="Screenshot 2022-03-03 at 15 25 26" src="https://user-images.githubusercontent.com/94084605/156601097-9660e33c-467e-4538-bf06-44c36219b58a.png">
<img width="1440" alt="Screenshot 2022-03-03 at 15 26 53" src="https://user-images.githubusercontent.com/94084605/156601137-16bc1de6-cef1-47c8-8881-76920bd60091.png">
<img width="1440" alt="Screenshot 2022-03-03 at 15 30 03" src="https://user-images.githubusercontent.com/94084605/156601163-09cec02b-316b-42ea-87a2-df264fb67eee.png">

### Results Page

<img width="1440" alt="Screenshot 2022-03-03 at 16 34 37" src="https://user-images.githubusercontent.com/94084605/156609216-b5dcd9c7-7912-4afe-937b-a9b4d09fb80c.png">

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

## Contributors
* [Kiran Aatkar](https://github.com/kiranaatkar)
* [Omar Shueb](https://github.com/Omar-Shueb)
* [Tamoor Waheed](https://github.com/TamoorW)
* [Tom Waghorn](https://github.com/tomw13)
