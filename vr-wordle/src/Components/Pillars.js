import Column from "./Column.js";

export default function Pillars(props) {
  return (
    <>
      <Column
        position={[-1.05, 0.6, -0.7]}
        guessIndex={1}
        setGuess={props.setGuess}
      />
      <Column
        position={[-0.6, 0.7, -0.9]}
        guessIndex={2}
        setGuess={props.setGuess}
      />
      <Column
        position={[0, 0.7, -1.1]}
        guessIndex={3}
        setGuess={props.setGuess}
      />
      <Column
        position={[0.6, 0.7, -0.9]}
        guessIndex={4}
        setGuess={props.setGuess}
      />
      <Column
        position={[1.05, 0.6, -0.7]}
        guessIndex={5}
        setGuess={props.setGuess}
      />
    </>
  );
}
