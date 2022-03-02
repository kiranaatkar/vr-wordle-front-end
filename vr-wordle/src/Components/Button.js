import React, { useState } from "react";
import { Box, Text } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { Interactive } from "@react-three/xr";
import { useSpring, animated } from "@react-spring/three";

export default function Button(props) {
  const [state, setState] = useState({
    press: false,
    hover: false,
    resetting: false,
  });

  const { scale } = useSpring({
    to: async (next, cancel) => {
      await next({ scale: [1, 0.5, 1] });
      await next({ scale: [1, 1, 1] });
    },
    from: { scale: [1, 1, 1] },
  });

  const [box] = useBox(() => ({
    args: [0.2, 0.2, 0.05],
    mass: 1,
    type: "Static",
    position: [-1.2, 1, -0.3],
    rotation: [-Math.PI / 2 + 0.2, 0, 0],
    material: {
      friction: 1,
    },
  }));

  function resetPositions() {
    props.reset();
    setTimeout(() => setState({ ...state, hover: false, press: false }), 1000);
  }

  return (
    <Box ref={box} args={[0.2, 0.3, 0.1]}>
      <Interactive
        onSelect={() => {
          setState({ ...state, press: true });
          resetPositions();
        }}
        onHover={() => setState({ ...state, hover: true })}
        onBlur={() => setState({ ...state, hover: false })}
      >
        <animated.mesh
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0.03, 0]}
          scale={state.press ? scale : [1, 1, 1]}
          onClick={(event) => {
            setState({ ...state, press: true });
            resetPositions();
          }}
          onPointerOver={(event) => setState({ ...state, hover: true })}
          onPointerOut={(event) => setState({ ...state, hover: false })}
        >
          <cylinderBufferGeometry
            args={[0.09, 0.09, 0.2, 30]}
          ></cylinderBufferGeometry>
          <meshBasicMaterial
            attach="material"
            color={state.hover ? "orange" : "red"}
          />
        </animated.mesh>
      </Interactive>
      <Text
        position={[0, -0.11, 0.051]}
        rotation={[0, 0, 0]}
        fontSize={0.05}
        color="white"
      >
        RESET
      </Text>
      <meshStandardMaterial color="gray" />
    </Box>
  );
}
