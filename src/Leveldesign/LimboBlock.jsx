import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { RigidBody } from "@react-three/rapier"

import {
    boxGeometry,
    pathMaterial,
    obstaclesMaterial,
    friction,
    widthFloor,
    heigthFloor,
    depthFloor,
    
    } from '../Experience.jsx'

export default function LimboBlock ({ position=[0,0,0] })
{
    const obstacle = useRef()
    //we change the offset of the limbo by offset the sin
    const [offset] = useState(()=> Math.random()* Math.PI*2)


    useFrame((state)=>
    {
        const time = state.clock.getElapsedTime()

        obstacle.current.setNextKinematicTranslation(
            {x:position[0],
             y:position[1] + Math.sin(time+ offset)+1.2,
             z:position[2]})
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
                position={[0,0.2,0]}
                restitution={0.2}
                friction={friction}
            >
            <mesh 
                geometry={boxGeometry} 
                material={obstaclesMaterial} 
                scale={[0.4,0.4,3.9]}
                castShadow
            />
            </RigidBody>
    </group>
    </>
}