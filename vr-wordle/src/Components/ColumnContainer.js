import PressurePlate from "./PressurePlate";

export default function ColumnContainer(props) {
  const { columnGeometry, setGuess, guessIndex } = props;
  let [x, y, z] = columnGeometry;
  y += 0.5; // Moves center up so bottom is at y=0

  return (
    // pressure plate, top, trunk, bottom
    <>
      <PressurePlate
        position={[x, y + 0.54, z]}
        args={[0.225, 0.225, 0.1, 32]}
        setGuess={setGuess}
        guessIndex={guessIndex}
      />
    </>
  );
}
