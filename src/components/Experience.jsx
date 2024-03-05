/* eslint-disable react/no-unknown-property */
import React from "react";
import { Float, OrbitControls } from "@react-three/drei";
import Background from "./Background";
import Airplane from "./Airplane";

const Experience = () => {
    return (
        <>
            <OrbitControls />
            <Background />
            <ambientLight intensity={0.6} />
            <directionalLight intensity={4} />
            <Float floatIntensity={2} speed={2}>
                <Airplane scale={[0.2, 0.2, 0.2]} rotation-y={Math.PI / 2} position-y={0.1} />
            </Float>
        </>
    );
};

export default Experience;
