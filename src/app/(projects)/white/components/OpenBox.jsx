import { BackSide, FrontSide, MeshStandardMaterial } from "three";
import { useState, useEffect, useRef } from "react";
import { SpotLight } from "@react-three/drei";
import { Mask } from "@react-three/drei";
const OpenBox = ({ stencil, x, y, i, temp }) => {
  const [hovered, setHovered] = useState(false)
  const targetRef = useRef();
  const [targetObject, setTargetObject] = useState();

  useEffect(() => {
    if (targetRef.current) {
      setTargetObject(targetRef.current);
    }
  }, [targetRef.current]);

  const materials = [
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'white', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: 'red', side: BackSide, visible: true }),
    new MeshStandardMaterial({ ...stencil, color: '#777', side: BackSide }),
  ];
  return (
    <>
      <group key={i} position={[x, y, -0.75]}>
        <Mask id={1} position={[0, 0, 0.75]}>
          <planeGeometry args={[1, 1]} />
        </Mask>
        <mesh
          position={[0, 0, 0]}
          castShadow={true}
          receiveShadow={true}
          material={materials}
        >
          <boxGeometry args={[1, 1, 1.5]} />
        </mesh>
        {/* not working right until i save it twice */}
        <SpotLight
          position={[0, 0.5, 0]} // Adjusted position for the top center
          intensity={4}
          distance={8}
          angle={Math.PI / 2}
          color={temp}
          castShadow
          penumbra={1}
          target={targetRef.current} // Pointing the spotlight to the target
        />

        {/* target at the bottom center of the box */}
        <mesh
          position={[0, y - 0.5, 0]} // Half the height of the box downward
          ref={targetRef}
        >
          <sphereGeometry args={[0.1, 32, 32]} /> 
          <meshStandardMaterial color="blue" transparent opacity={0}/> 
        </mesh>
      </group>
    </>
  )
}

export default OpenBox


{/* <OpenBox x={(-(rows / 2) + (i)) + 0.2 * i} y={0} /> */ }