import Column from "./Column.js";

export default function Pillars(props) {
  return (
    <>
      <Column
        position={[-1.25, 0.2, -0.9]}
        guessIndex={1}
        setGuess={props.setGuess}
      />
      <Column
        position={[-0.6, 0.3, -1.3]}
        guessIndex={2}
        setGuess={props.setGuess}
      />
      <Column
        position={[0, 0.4, -1.5]}
        guessIndex={3}
        setGuess={props.setGuess}
      />
      <Column
        position={[0.6, 0.3, -1.3]}
        guessIndex={4}
        setGuess={props.setGuess}
      />
      <Column
        position={[1.2, 0.2, -0.9]}
        guessIndex={5}
        setGuess={props.setGuess}
      />
    </>
  );
}
