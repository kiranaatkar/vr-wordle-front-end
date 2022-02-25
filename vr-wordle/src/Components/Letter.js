import React, { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Interactive, useController, useXRFrame } from "@react-three/xr";
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

  const args = [0.4, 0.4, 0.4];

  const [box, api] = useBox(() => ({
    mass: 1,
    position: position,
    args: args,
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
        1
      );
    },
    { pointerEvents: true }
  );

  const grabController = useController("right");

  useXRFrame(() => {
    const pos = new Vector3();
    const posB = new Vector3();
    grabController.controller.getWorldPosition(pos);
    box.current.getWorldPosition(posB);
    const distance = pos.distanceTo(posB);

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
        args={args}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
        name={props.name}
      >
        <meshStandardMaterial color={hovered ? "orange" : "hotpink"} />
      </Box>
    </Interactive>
  );
}
