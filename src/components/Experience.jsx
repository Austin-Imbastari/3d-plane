/* eslint-disable react/no-unknown-property */
import React, { useMemo, useRef } from "react";
import { Float, OrbitControls, Line, PerspectiveCamera, useScroll } from "@react-three/drei";
import * as THREE from "three";
import Background from "./Background";
import Airplane from "./Airplane";
import Cloud from "./Cloud";
import { useFrame } from "@react-three/fiber";

const Experience = () => {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -10),
                new THREE.Vector3(-2, 0, -20),
                new THREE.Vector3(-3, 0, -30),
                new THREE.Vector3(0, 0, -40),
                new THREE.Vector3(5, 0, -50),
                new THREE.Vector3(5, 0, -70),
                new THREE.Vector3(0, 0, -80),
                new THREE.Vector3(0, 0, -90),
                new THREE.Vector3(0, 0, -100),
            ],
            false,
            "catmullrom",
            0.5
        );
    });
    const linePoints = useMemo(() => {
        return curve.getPoints(8000);
    }, [curve]);

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);
        return shape;
    }, [curve]);

    const cameraGroup = useRef();
    const airplane = useRef();
    const scroll = useScroll();

    useFrame((state, delta) => {
        const curPointIndex = Math.min(Math.round(scroll.offset * linePoints.length), linePoints.length - 1);
        const curPoint = linePoints[curPointIndex];
        const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

        const xDisplacement = (pointAhead.x - curPoint.x) * 80;

        const angleRotation = (xDisplacement < 0 ? 1 : -1) * Math.min(Math.abs(xDisplacement), Math.PI / 3);

        const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(airplane.current.rotation.x, angleRotation, airplane.current.rotation.y)
        );
        const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(cameraGroup.current.rotation.x, cameraGroup.current.rotation.z, angleRotation)
        );
        airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
        cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

        cameraGroup.current.position.lerp(curPoint, delta * 24);
    });

    return (
        <>
            {/* <OrbitControls enableZoom={false} /> */}
            <group ref={cameraGroup}>
                <Background />
                <PerspectiveCamera position={[0, 0.2, 5]} fov={30} makeDefault />
                <ambientLight intensity={0.6} />
                <directionalLight intensity={4} />
                <group ref={airplane}>
                    <Float floatIntensity={2} speed={2}>
                        <Airplane scale={[0.2, 0.2, 0.2]} rotation-y={Math.PI / 2} position-y={0.1} />
                    </Float>
                </group>
            </group>

            <Cloud opacity={0.5} scale={[0.3, 0.3, 0.3]} position={[-3, 1, -3]} />
            <Cloud opacity={0.5} scale={[0.2, 0.3, 0.4]} position={[-1.5, -0.5, -2]} />
            <Cloud opacity={0.5} scale={[0.2, 0.3, 0.4]} position={[-2, -0.8, -2]} />
            <Cloud opacity={0.7} scale={[0.3, 0.3, 0.4]} rotation-y={[Math.PI / 9]} position={[2, -0.2, -2]} />
            <Cloud opacity={0.7} scale={[0.4, 0.4, 0.4]} rotation-y={[Math.PI / 9]} position={[1, -0.2, -22]} />
            <Cloud opacity={0.7} scale={[0.5, 0.5, 0.5]} rotation-y={[Math.PI / 9]} position={[-1, 1, -53]} />
            <group position-y={-1}>
                <Line points={linePoints} color={"white"} opacity={0.7} lineWidth={20} transparent />
                <mesh>
                    <extrudeGeometry
                        args={[
                            shape,
                            {
                                steps: 200,
                                bevelEnabled: false,
                                extrudePath: curve,
                            },
                        ]}
                    />
                    <meshStandardMaterial color={"white"} opacity={0.7} transparent />
                </mesh>
            </group>
        </>
    );
};

export default Experience;
