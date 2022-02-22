import React, { useState } from "react";
import { useThree } from "@react-three/fiber";
import { Interactive, RayGrab } from "@react-three/xr";
import { useDrag } from "@use-gesture/react";
import { useBox } from "@react-three/cannon";

export default function Box(props) {
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const { size, viewport } = useThree();
  const [position] = useState(props.position);
  const aspect = size.width / viewport.width;

  const [box, api] = useBox(() => ({ mass: 1, ...props }));

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

  return (
    <Interactive onHover={() => hover(true)} onBlur={() => hover(false)}>
      <RayGrab>
        <mesh
          {...bind()}
          ref={box}
          position={position}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        >
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial color={hovered ? "orange" : "hotpink"} />
        </mesh>
      </RayGrab>
    </Interactive>
  );
}
