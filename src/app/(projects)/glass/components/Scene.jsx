"use client";
import { useRef, useEffect } from "react";
import { Mask, OrbitControls, useMask, Environment, useEnvironment, Plane } from "@react-three/drei";
import OpenBox from './OpenBox'
import { useControls } from 'leva'

import { MeshPhysicalMaterial } from "three";

import { Couch } from "./Couch";

export default function Scene() {
  const rgbeTexture = useEnvironment({ files: './modern_buildings_night_1k.hdr' })
  const { color } = useControls({
    color: { h: 32, s: 35, l: 78 }
  });
  const stencil = useMask(1, true)

  useEffect(() => {
    console.log('Color changed:', color);
    // If you want to log it in HSL format:
    console.log(`hsl(${color.h}, ${color.s}%, ${color.l}%)`);
  }, [color]);

  return (
    <>
      <OrbitControls />


      {/*glass*/}
      <mesh position={[0, 0, 0.751]} onCreated={({ object }) => object.layers.set(1)}>
        <planeGeometry args={[3, 3]} />
        <meshPhysicalMaterial color="white" transmission={1} thickness={0} roughness={0.17} envMap={rgbeTexture} envMapIntensity={0.2} />
      </mesh>

      {/*apartment*/}
      <OpenBox x={0} y={0} i={1} temp={`hsl(${color.h}, ${color.s}%, ${color.l}%)`} />
      <Couch position={[1, -1.5, -0.50]} rotation={[0, -Math.PI / 2, 0]} />



      {/* <Plane args={[1, 1]} position={[0, 0, 2.01]}>
        <meshBasicMaterial color={"blue"} />
      </Plane> */}
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