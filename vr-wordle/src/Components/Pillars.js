import Column from "./Column.js";

export default function Pillars(props) {
  return (
    <>
      <Column
        position={[-1.25, 0, 0.4]}
        guessIndex={4}
        setGuess={props.setGuess}
      />
      <Column
        position={[-0.6, 0, 0.6]}
        guessIndex={3}
        setGuess={props.setGuess}
      />
      <Column
        position={[0, -0.1, 0.7]}
        guessIndex={2}
        setGuess={props.setGuess}
      />
      <Column
        position={[0.6, 0, 0.6]}
        guessIndex={1}
        setGuess={props.setGuess}
      />
      <Column
        position={[1.2, 0, 0.4]}
        guessIndex={0}
        setGuess={props.setGuess}
      />
    </>
  );
}
