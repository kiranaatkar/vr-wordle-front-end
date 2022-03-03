import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function RightHand(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/rightHand.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Palm} />
          <skinnedMesh
            name="Hand"
            geometry={nodes.Hand.geometry}
            material={materials["Material.001"]}
            skeleton={nodes.Hand.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/rightHand.glb");
