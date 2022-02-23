import { useThree } from "@react-three/fiber";
import {
  MeshLambertMaterial,
  BoxBufferGeometry,
  Object3D,
  InstancedMesh,
} from "three";

let mesh;
const tempBoxes = new Object3D();

function AddInstancedMesh() {
  console.log("meshed");
  // An InstancedMesh of 4 cubes
  mesh = new InstancedMesh(
    new BoxBufferGeometry(0.3, 0.3, 0.3),
    new MeshLambertMaterial({ color: "red" }),
    26
  );
  const { scene } = useThree();
  scene.add(mesh);
  setInstancedMeshPositions(mesh);
}

function setInstancedMeshPositions(mesh) {
  console.log("positioned");
  for (var i = 0; i < mesh.count; i++) {
    tempBoxes.position.set(
      -2 + (i % 9) * 0.5,
      2 - Math.floor(i / 9) * 0.5,
      -2 + Math.floor(i / 9) * 0.5
    );
    tempBoxes.updateMatrix();
    mesh.setMatrixAt(i, tempBoxes.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

export default function Keyboard() {
  AddInstancedMesh();
  return null;
}
