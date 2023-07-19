import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { useEffect, useRef } from "react"
import {
    boxGeometry,
    InOutMaterial,
    restitution,
    friction,
    widthFloor,
    heigthFloor,
    depthFloor,
    } from '../setup/Level.jsx'

export default function End({ position=[0,0,0],})
{   
    const container = useRef()
    const hamburger = useGLTF('../hamburger.glb')
    hamburger.scene.children.forEach((mesh)=>
    {
       mesh.castShadow = true 
    })

    useEffect(()=>{
        container.current.setTranslation({x:position[0], y: 0 , z: 0})
    },[position])

    return<>
            <mesh 
                geometry={boxGeometry} 
                material={InOutMaterial} 
                scale={[heigthFloor,depthFloor,widthFloor]}
                position={position}
                receiveShadow
            />
            <RigidBody
                ref={container}
                type="fixed" 
                colliders="hull" 
                restitution={restitution} 
                friction={friction}
            > 
            <primitive object={hamburger.scene} scale={0.2} />
            </RigidBody>
    </>
}