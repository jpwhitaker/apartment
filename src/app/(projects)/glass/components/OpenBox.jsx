import { BackSide, FrontSide, MeshStandardMaterial, MeshPhysicalMaterial } from "three";
import { useState, useEffect, useRef } from "react";
import { SpotLight } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

import { Couch } from './Couch'
const OpenBox = ({ stencil, x, y, i, temp }) => {
  const [hovered, setHovered] = useState(false)
  const targetRef = useRef();
  const [targetObject, setTargetObject] = useState();
  const windowRef = useRef();
  const envMap = useLoader(RGBELoader, '/modern_buildings_night_1k.hdr')


  useEffect(() => {
    if (targetRef.current) {
      setTargetObject(targetRef.current);
    }
  }, [targetRef.current]);




  // new MeshPhysicalMaterial({  color: 'white', side: FrontSide, transmission:1, roughness:0.1, ior:2, iridescence: 0.5}),
  const materials = [
    new MeshStandardMaterial({ ...stencil, color: '#fff', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: '#fff', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: '#fff', side: BackSide }),
    new MeshStandardMaterial({ ...stencil, color: '#fff', side: BackSide }),
    new MeshStandardMaterial({ transparent: true, opacity:0 }),
    new MeshStandardMaterial({ ...stencil, color: '#fff', side: BackSide }),
  ];
  return (
    <>
      <group key={i} position={[x, y, -0.75]}>
        
        <mesh
          position={[0, 0, 0]}
          castShadow={true}
          receiveShadow={true}
          material={materials}
        >
          <boxGeometry args={[3, 3, 3]} />
        </mesh>
        {/* <mesh position={[0, 0, 1.5]} ref={windowRef}>
          <planeGeometry args={[3, 3]} />
          <meshPhysicalMaterial color="white" transmission={1} thickness={0.1} roughness={0.2} envMap={envMap} envMapIntensity={100}/>
        </mesh> */}


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
          <meshStandardMaterial color="blue" transparent opacity={0} />
        </mesh>
      </group>
    </>
  )
}

export default OpenBox


{/* <OpenBox x={(-(rows / 2) + (i)) + 0.2 * i} y={0} /> */ }