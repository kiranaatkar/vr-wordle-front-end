import React from "react";
import { Text } from "@react-three/drei";

export default function Notification(props) {
  return (
    <Text
      position={[0, 1.22, -1.45]}
      rotation={[-Math.PI / 2, 0, 0]}
      fontSize={0.2}
      color={"red"}
    >
      {props.tableText}
    </Text>
  );
}
