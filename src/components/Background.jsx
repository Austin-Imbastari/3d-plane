import { Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";

import * as THREE from "three";

const Background = () => {
    return (
        <>
            {/* <Environment preset='sunset' /> */}
            <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
                <LayerMaterial color={"#ffffff"} lighting='physical' transmission={1} side={THREE.BackSide}>
                    <Gradient colorA={"#63c5da"} colorB={"white"} axes={"y"} start={0} end={-0.7} />
                </LayerMaterial>
            </Sphere>
        </>
    );
};

export default Background;
