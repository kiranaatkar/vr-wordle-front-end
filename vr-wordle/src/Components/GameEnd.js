import { useThree } from "@react-three/fiber";
import { Navigate } from "react-router";

export default function GameEnd(props) {
  const { gl } = useThree();

  const endGame = () => {
    const session = gl.xr.getSession();
    console.log(session);
    if (session) {
      session.end();
      props.endGame();
    }
  };

  return endGame();
}
