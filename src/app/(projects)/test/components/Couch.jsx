import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Couch(props) {
  const { nodes, materials } = useGLTF("/couch.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.sofa_022.geometry}
        material={materials["Material.001"]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/couch.glb");
