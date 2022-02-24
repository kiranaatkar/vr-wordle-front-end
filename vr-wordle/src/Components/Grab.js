import { useState, useRef } from "react";
import { useBox, useLockConstraint } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useXR, useXREvent } from "@react-three/xr";
import { Vector3 } from "three";

export default function Grabber({ ...groupRef }) {
  const [dummyRef, api] = useBox(() => ({
    type: "Dynamic",
    collisionFilterGroup: 32,
    collisionFilterMask: 32,
    args: [0.01, 0.01, 0.01],
  }));
  const [grabbing, setGrabbing] = useState(false);
  const ref = useRef();

  useLockConstraint(
    { current: grabbing ? ref.current : null },
    dummyRef,
    {
      maxForce: 2,
    },
    [grabbing]
  );

  const controllers = useXR();

  const grabControllerRight = controllers.controllers[0];
  const grabControllerLeft = null;

  useXREvent("selectstart", (e) => {
    for (const child of groupRef.groupRef.current.children) {
      const pos = new Vector3();
      const posB = new Vector3();

      e.controller.controller.getWorldPosition(pos);
      child.children[0].getWorldPosition(posB);
      const distance = pos.distanceTo(posB);

      if (distance < 0.1) {
        api.position.copy(e.controller.controller.position);
        api.rotation.copy(e.controller.controller.rotation);
        setGrabbing(true);
        if (e.originalEvent.data.handedness === "right") {
          grabControllerRight.current = e.controller;
        } else {
          grabControllerLeft.current = e.controller;
        }
        ref.current = child.children[0];
        break;
      }
    }
  });

  useXREvent("selectend", (e) => {
    setGrabbing(false);
  });

  useFrame(() => {
    if (grabControllerRight) {
      api.position.copy(grabControllerRight.controller.position);
      api.rotation.copy(grabControllerRight.controller.rotation);
    }
  });

  return null;
}
