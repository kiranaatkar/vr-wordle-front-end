import React, { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Interactive, useXR, useXRFrame } from "@react-three/xr";
import { useDrag } from "@use-gesture/react";
import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";
import { Vector3 } from "three";

export default function Letter(props) {
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const { size, viewport } = useThree();
  const [position] = useState(props.position);
  const aspect = size.width / viewport.width;

  const [box, api] = useBox(() => ({
    mass: 1,
    position: position,
    args: [0.4, 0.4, 0.4],
    material: {
      friction: 1,
    },
  }));

  const bind = useDrag(
    ({ offset: [,], xy: [x, y], first, last }) => {
      if (first) {
        api.mass.set(0);
      } else if (last) {
        api.mass.set(10);
      }
      api.position.set(
        (x - size.width / 2) / aspect,
        -(y - size.height / 2) / aspect,
        -0.7
      );
    },
    { pointerEvents: true }
  );

  const controllers = useXR();

  useXRFrame(() => {
    const grabController = controllers.controllers[0];

    const pos = new Vector3();
    const posB = new Vector3();
    grabController.controller.getWorldPosition(pos);
    box.current.getWorldPosition(posB);
    const distance = pos.distanceTo(posB);

    console.log(distance);

    if (distance < 0.1) {
      hover(true);
    } else {
      hover(false);
    }
  });

  return (
    <Interactive onBlur={() => hover(false)}>
      <Box
        {...bind()}
        ref={box}
        args={[0.4, 0.4, 0.4]}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <meshStandardMaterial color={hovered ? "orange" : "hotpink"} />
      </Box>
    </Interactive>
  );
}
