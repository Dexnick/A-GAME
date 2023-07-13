import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"

import {
    boxGeometry,
    pathMaterial,
    obstaclesMaterial,
    friction,
    widthFloor,
    heigthFloor,
    depthFloor,
    } from '../Experience.jsx'


export default function AxeBlock ({ position=[0,0,0] })
{
    const obstacle = useRef()
    //we change the offset of the limbo by changing where the sin function starts
    const [offset] = useState(()=> Math.random() * Math.PI*2)


    useFrame((state)=>
    {
        const time = state.clock.getElapsedTime()

        obstacle.current.setNextKinematicTranslation(
            {x:position[0],
             y:position[1]+1.2,
             z:position[2] + + Math.sin(time + offset)})
    })

    return<>
    <group position={position}>
            <mesh 
                geometry={boxGeometry} 
                material={pathMaterial} 
                scale={[heigthFloor,depthFloor,widthFloor]}
                receiveShadow
            />
            <RigidBody 
                ref={obstacle}
                type="kinematicPosition" 
                position={[0,0,0]}
                restitution={0.2}
                friction={friction}
            >
            <mesh 
                geometry={boxGeometry} 
                material={obstaclesMaterial} 
                scale={[0.4,2,2]}
                castShadow
            />
            </RigidBody>
    </group>
    </>
}