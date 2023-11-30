"use client";
import { useRef, useEffect } from "react";
import { Mask, OrbitControls, useMask, Environment } from "@react-three/drei";
import Lights from './Lights'
import OpenBox from './OpenBox'


export default function Scene() {
  const stencil = useMask(1, true)
  const envRef = useRef();


  useEffect(() => {
    // Assuming you want to put the spotlight on layer 1

    if (envRef.current !== undefined) {
      debugger
      envRef.current.layers.set(1);
    }


  }, []);


  return (
    <>
      {/* <Lights /> */}
      {/* <mesh  position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshPhysicalMaterial color="white" transmission={0.4} roughness={0.2}   />
      </mesh> */}
      <OrbitControls />
      {/* Mask should punch holes on this mesh */}
      {/* <mesh position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="red" {...stencil} />
      </mesh> */}
      <group ref={envRef}>
        {/* <Environment background={false} files={'/modern_buildings_night_1k.hdr'} blur={0.8} /> */}
      </group>
      <OpenBox x={0} y={0} i={1} temp={getRandomLightColor()} />

    </>
  )
}



function getRandomLightColor() {
  // Define the hue range for cooler to warmer tones
  // Cooler tones (bluish): around 180-240 degrees in the HSV color model
  // Warmer tones (yellowish-reddish): around 0-60 degrees in the HSV color model
  // Adjust these ranges based on your specific needs
  const coolerHueRange = [180, 200];
  const warmerHueRange = [15, 50];

  // Randomly decide whether to generate a cooler or warmer tone
  const useCoolerTone = Math.random() < 0.5;

  // Choose the hue range based on the above decision
  const chosenRange = useCoolerTone ? coolerHueRange : warmerHueRange;

  // Generate a random hue within the chosen range
  const hue = Math.floor(Math.random() * (chosenRange[1] - chosenRange[0] + 1)) + chosenRange[0];
  // const hue = Math.floor(Math.random() * (chosenRange[1] - chosenRange[0] + 1)) + chosenRange[0];

  const saturation = Math.random() * (50 - 30) + 30;
  // Convert the hue to an RGB color
  // Here, we're using full saturation (100%) and value (100%) for simplicity
  // You can adjust these values if you need different saturation or brightness levels
  return `hsl(${hue}, ${saturation}%, 50%)`;
}