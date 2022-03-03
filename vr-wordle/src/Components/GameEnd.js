import { useThree } from '@react-three/fiber';

export default function GameEnd(props) {
  const { gl } = useThree();

  const endGame = () => {
    const session = gl.xr.getSession();
    if (session) {
      session.end();
      props.endGame();
    } else if (process.env.NODE_ENV === 'development') {
      props.endGame();
    }
  };

  return endGame();
}
