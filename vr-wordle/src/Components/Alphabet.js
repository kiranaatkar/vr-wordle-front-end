import React from "react";
import { Text } from "@react-three/drei";

export default function Alphabet() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  return alphabet.map((letter) => {
    return (
      <Text fillOpacity={0} position={[0, -10, 10]}>
        {letter}
      </Text>
    );
  });
}
