import { useState, useRef } from "react";
import { useBox, useLockConstraint } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useController, useXREvent } from "@react-three/xr";
import { Vector3 } from "three";

export default function Grabber({ ...groupRef }) {
  // Creating a dummy ref to simulate the ref of a controller that we can mutate
  const [dummyRef, api] = useBox(() => ({
    type: "Dynamic",
    collisionFilterGroup: 32,
    collisionFilterMask: 32,
    args: [0.01, 0.01, 0.01],
  }));

  const [grabbing, setGrabbing] = useState(false);

  const ref = useRef(); // A ref that will be used to attach the boxes to

  // Creates a tether between the box and the controller
  useLockConstraint(
    { current: grabbing ? ref.current : null },
    dummyRef,
    {
      maxForce: 2,
    },
    [grabbing]
  );

  // Only grabbing the right controller to minimise conflict
  const grabController = useController("right");

  useXREvent("selectstart", (e) => {
    // Checking the position of all the boxes to see if any are within grabbing distance
    for (const child of groupRef.groupRef.current.children) {
      const pos = new Vector3();
      const posB = new Vector3();

      e.controller.controller.getWorldPosition(pos);
      child.children[0].getWorldPosition(posB);
      const distance = pos.distanceTo(posB); // Distance between controller and the box

      if (distance < 0.1) {
        api.position.copy(e.controller.controller.position); // If they are within a set distance, start copying
        api.rotation.copy(e.controller.controller.rotation); // positional and rotation data to the dummy ref
        setGrabbing(true); // Activate the lock constraint
        grabController.current = e.controller;
        ref.current = child.children[0]; // Set the ref used in the lock constraint to the ref of the selected box
        break;
      }
    }
  });

  useXREvent("selectend", (e) => {
    setGrabbing(false);
  });

  useFrame(() => {
    if (grabController) {
      api.position.copy(grabController.controller.position); // Constantly copy the data of the controller to the
      api.rotation.copy(grabController.controller.rotation); // dummy ref
    }
  });

  return null;
}
