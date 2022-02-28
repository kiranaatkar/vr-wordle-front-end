import { useCylinder } from "@react-three/cannon";
import { useState, useRef, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

export default function PressurePlate(props) {
  const [pressed, setPress] = useState(false);

  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, "/pressure.mp3");

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    camera.add(listener);
    return () => camera.remove(listener);
  });

  const [colorMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    "/textures/aerial_rocks_02_diff_2k.jpg",
    "/textures/aerial_rocks_02_nor_dx_2k.jpg",
    "/textures/aerial_rocks_02_rough_2k.jpg",
    "/textures/aerial_rocks_02_ao_2k.jpg",
  ]);

  const [ref] = useCylinder(() => ({
    type: "Static",
    mass: 10,
    args: props.args,
    scale: [1, pressed ? 0.2 : 1, 1],
    position: props.position,
    onCollide: (e) => {
      props.setGuess(e.body.name, props.guessIndex);
    },
    onCollideBegin: () => {
      setPress(true);
      sound.current.play();
    },
    onCollideEnd: () => {
      setPress(false);
    },
  }));

  const { scale } = useSpring({
    to: { scale: [1, pressed ? 0.5 : 1, 1] },
    from: { scale: [1, pressed ? 1 : 0.5, 1] },
    config: config.slow,
  });

  function getPlateColor() {
    return pressed ? (
      <meshNormalMaterial color={"white"} />
    ) : (
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    );
  }

  return (
    <animated.mesh ref={ref} scale={scale}>
      <cylinderBufferGeometry attach="geometry" args={props.args} />
      {getPlateColor()}
      <positionalAudio ref={sound} args={[listener]} />
    </animated.mesh>
  );
}
