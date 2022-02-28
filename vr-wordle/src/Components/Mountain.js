import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/uploads_files_3605962_mountain (1).glb"
  );
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={[0.1, 0.1, 0.1]}
      position={[-16, -76.1, 5]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[13096948, 0, 4067400]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EXPORT_GOOGLE_SAT_WM.geometry}
        material={materials.rastMat}
        scale={0.25}
      />
    </group>
  );
}

useGLTF.preload("/uploads_files_3605962_mountain (1).glb");
