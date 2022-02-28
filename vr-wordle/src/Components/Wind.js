import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree, useLoader } from "react-three-fiber";

export default function Wind() {
  const wind = "/wind.mp3";
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, wind);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setVolume(0.25);
    sound.current.setRefDistance(1);
    sound.current.setLoop(true);
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
  });
  return <positionalAudio ref={sound} args={[listener]} />;
}
