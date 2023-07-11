import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { RigidBody } from "@react-three/rapier"
import * as THREE from 'three'

import {
    boxGeometry,
    pathMaterial,
    obstaclesMaterial,
    friction,
    widthFloor,
    heigthFloor,
    depthFloor,
    
    } from '../Experience.jsx'


export default function TwisterBlock ({ position=[0,0,0] })
{
    const obstacle = useRef()
    //we change the direction of spin by * the speed to -1
    const [speed] = useState(()=> (Math.random()+2) * (Math.random()<0.5 ? -1:1))


    useFrame((state)=>
    {
        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0,time * speed,0))
        obstacle.current.setNextKinematicRotation(rotation)
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
