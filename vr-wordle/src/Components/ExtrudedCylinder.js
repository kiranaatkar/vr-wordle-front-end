import React, { useRef } from "react";
import { useCompoundBody, useBox } from "@react-three/cannon";
import * as THREE from "three";
import { Shape } from "three";

export default function Cylinder(props) {
  // Make the cup a physics object with a big mass
  // args: topRad, bottomRad, height, radialSegments, heightSegments, openEnded

  // const [topRad, bottomRad, height, radSeg, hSeg, open] = [
  //   0.6,
  //   0.4,
  //   0.75,
  //   32,
  //   1,
  //   true,
  // ];
  // const args = [topRad, bottomRad, height, radSeg, hSeg, open];

  const length = 0.12;
  const width = 0.8;
  const ref = useRef();

  const outerRadius = 0.6;
  const innerRadius = outerRadius - 0.1;
  const radialSegments = 32;
  const height = 0.75;

  const extrudeSettings = {
    depth: height,
    bevelEnabled: false,
    steps: 2,
    curveSegments: radialSegments,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  const arcShape = new THREE.Shape();

  arcShape.moveTo(outerRadius * 2, outerRadius);

  arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false);

  const holePath = new THREE.Path();
  holePath.moveTo(outerRadius + innerRadius, outerRadius);
  holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, false);
  arcShape.holes.push(holePath);

  console.log(arcShape);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <extrudeBufferGeometry
        ref={ref}
        args={[arcShape, extrudeSettings]}
        {...props}
      />
      <meshNormalMaterial />
    </mesh>
  );
}
