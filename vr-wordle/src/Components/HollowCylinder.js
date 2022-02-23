import React, { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useCylinder } from "@react-three/cannon";

// Solution from: https://stackoverflow.com/a/47422111

export default function HollowCylinderGeometry(props) {
  const outerRadius = 0.6;
  const innerRadius = outerRadius - 0.1;
  const radialSegments = 32;
  const height = 0.75;
  const ref = useCylinder(() => ({
    mass: 1000,
    material: {
      friction: 1,
    },
  }));

  const { arcShape, options } = useMemo(() => {
    const arcShape = new THREE.Shape();

    arcShape.moveTo(outerRadius * 2, outerRadius);

    arcShape.absarc(
      outerRadius,
      outerRadius,
      outerRadius,
      0,
      Math.PI * 2,
      false
    );

    const holePath = new THREE.Path();
    holePath.moveTo(outerRadius + innerRadius, outerRadius);
    holePath.absarc(
      outerRadius,
      outerRadius,
      innerRadius,
      0,
      Math.PI * 2,
      false
    );
    arcShape.holes.push(holePath);
    const options = {
      depth: height,
      bevelEnabled: false,
      steps: 2,
      curveSegments: radialSegments,
    };
    return { arcShape, options };
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <extrudeBufferGeometry ref={ref} args={[arcShape, options]} {...props} />
      <meshNormalMaterial />
    </mesh>
  );
}
