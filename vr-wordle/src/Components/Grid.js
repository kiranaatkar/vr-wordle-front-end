import { Box, Text } from "@react-three/drei";

export default function Grid(props) {
  return props.guesses.map((it, i) => (
    <group position={[0, 7 - i * 1.2, -2]} key={i}>
      {Guess(it, props.answer)}
    </group>
  ));
}

function StaticLetter(props) {
  const size = [props.side, props.side, props.side];
  const color = {
    present: "#b59f3b",
    correct: "#538d4e",
    absent: "#3a3a3c",
  }[props.state];

  return (
    <Box args={size} position={props.position} rotation={[Math.PI / 2, 0, 0]}>
      <Text
        userData={{ letter: props.id }}
        position={[0, size[1] / 2 + 0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={props.side - 0.1}
      >
        {props.id.toUpperCase()}
      </Text>
      <meshStandardMaterial color={color} />
    </Box>
  );
}

function Guess(guess, word) {
  const side = 1;
  const space = 0.1;
  const width = (side + space) * 4;
  return (
    <>
      {guess.split("").map((it, i) => (
        <StaticLetter
          side={side}
          id={it}
          key={i}
          position={[-width / 2 + (side + space) * i, 0, 0]}
          key={i}
          state={
            word[i] === it
              ? "correct"
              : word.includes(it)
              ? "present"
              : "absent"
          }
        />
      ))}
    </>
  );
}
