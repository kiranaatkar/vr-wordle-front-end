import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import BoxTrigger from "./BoxTrigger.js";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/uploads_files_1953815_bucket.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        scale={3}
        castShadow
        receiveShadow
        geometry={nodes.Bucket.geometry}
        material={materials.Bucket}
      >
        <meshStandardMaterial wireframe color="green" />
      </mesh>
      <BoxTrigger args={[0.5, 0.5, 0.5]} position={[0, 0.25, 0]} />
    </group>
  );
}

useGLTF.preload("/uploads_files_1953815_bucket.glb");
