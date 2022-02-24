import { useThree } from "@react-three/fiber";
import {
  CubeTextureLoader,
  MeshBasicMaterial,
  Mesh,
  BackSide,
  BoxGeometry,
} from "three";

export default function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  const environment = "space";

  const texture = loader.load([
    `/${environment}/1.png`,
    `/${environment}/2.png`,
    `/${environment}/3.png`,
    `/${environment}/4.png`,
    `/${environment}/5.png`,
    `/${environment}/6.png`,
  ]);

  const geometry = new BoxGeometry(1000, 1000, 1000);

  const material = new MeshBasicMaterial({
    envMap: texture,
    side: BackSide,
  });

  const cube = new Mesh(geometry, material);

  scene.add(cube);

  return null;
}
