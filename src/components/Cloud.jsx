import { useGLTF } from "@react-three/drei";

function Cloud({ opacity, ...props }) {
    const { nodes, materials } = useGLTF("/cloud.glb");
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Node.geometry}>
                <meshStandardMaterial {...materials["lambert2SG.white"]} transparent opacity={opacity} />
            </mesh>
        </group>
    );
}

useGLTF.preload("/cloud.glb");

export default Cloud;
