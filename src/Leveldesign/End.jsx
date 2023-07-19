import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

import {
    boxGeometry,
    InOutMaterial,
    restitution,
    friction,
    widthFloor,
    heigthFloor,
    depthFloor,
    } from '../setup/Level.jsx'

export default function End({ position=[0,0,0] })
{   
    const hamburger = useGLTF('../hamburger.glb')
    hamburger.scene.children.forEach((mesh)=>
    {
       mesh.castShadow = true 
    })

    return<>
    <group position={position}>
            <mesh 
                geometry={boxGeometry} 
                material={InOutMaterial} 
                scale={[heigthFloor,depthFloor,widthFloor]}
                receiveShadow
            />
            <RigidBody type="fixed" colliders="hull" restitution={restitution} friction={friction}> 
            <primitive object={hamburger.scene} scale={0.2} position-y={depthFloor - 0.5}/>
            </RigidBody>
    </group>
    </>
}