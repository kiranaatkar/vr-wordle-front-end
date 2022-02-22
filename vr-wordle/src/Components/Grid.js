import React, { useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  MeshLambertMaterial,
  BoxBufferGeometry,
  Object3D,
  InstancedMesh,
} from "three";

var mesh;
const tempBoxes = new Object3D();

function AddInstancedMesh() {
  console.log("meshed");
  // An InstancedMesh of 4 cubes
  mesh = new InstancedMesh(
    new BoxBufferGeometry(1, 1, 1),
    new MeshLambertMaterial({ color: "white" }),
    30
  );
  const { scene } = useThree();
  scene.add(mesh);
  setInstancedMeshPositions(mesh);
}

function setInstancedMeshPositions(mesh) {
  console.log("positioned");
  for (var i = 0; i < mesh.count; i++) {
    // we add 200 units of distance (the width of the section) between each.
    tempBoxes.position.set(
      -2.8 + (i % 5) * 1.4,
      12 - Math.floor(i / 5) * 2,
      -5
    );
    tempBoxes.updateMatrix();
    mesh.setMatrixAt(i, tempBoxes.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

export default function Grid() {
  AddInstancedMesh();
  return null;
}
