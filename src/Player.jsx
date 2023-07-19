import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState} from "react";
import * as THREE from 'three'
import useGame from "./stores/useGame";


export default function Player({position=[0,0,0]})
{   
    const radius = 0.4
    const ball = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const {rapier, world} = useRapier()
    
    const [ smoothedCameraPosition ] = useState(()=> new THREE.Vector3(-10,10,0))
    const [ smoothedCameraTarget ] = useState(()=> new THREE.Vector3())

    const start = useGame((state)=> state.start)
    const end = useGame((state)=> state.end)
    const restart = useGame((state)=> state.restart)
    const blocksCount = useGame((state)=> state.blocksCount)

    const jump = ()=>
    {
        const origin = ball.current.translation()
        origin.y -= radius + 0.01
        const rayDirection = {x:0, y:-1 ,z:0}
        const ray = new rapier.Ray(origin,rayDirection)
        const hit = world.castRay(ray, 10, true)

        if (hit.toi < 0.15 ) 
        ball.current.applyImpulse({x:0, y:1.5, z:0})
    }
    useEffect(()=>
    {
        const unsubscribeJump = subscribeKeys(
            //Selector, what we want to listen
            (state)=> state.jump,
            (value)=>
            {
                if (value) 
                {
                    jump()
                }
            },
        )

        const unsubscribeAny = subscribeKeys(
            ()=>
            {
                start()
            }
        )

        return () =>
        {
            unsubscribeJump()
            unsubscribeAny()
        }
    },[])

    useFrame((state,delta)=>
    {
        const {forward, backward, leftward, rightward} = getKeys()

        const impulse = {x:0 , y:0, z: 0 }
        const torque = {x:0 , y:0, z: 0 }
        
        const impulseStrength = 1 * delta
        const torqueStrength = 0.5 * delta

        if (forward) 
        {
            impulse.x = impulseStrength  
            torque.z = - torqueStrength  
        }
        if (backward) 
        {
            impulse.x = -impulseStrength  
            torque.z = torqueStrength  
        }
        if (leftward) 
        {
            impulse.z = -impulseStrength  
            torque.x = -torqueStrength  
        }
        if (rightward) 
        {
            impulse.z = impulseStrength  
            torque.x = torqueStrength  
        }

        ball.current.applyImpulse(impulse)
        ball.current.applyTorqueImpulse(torque)

        //CAMERA 

        const ballPosition = ball.current.translation()
   

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(ballPosition)
        cameraPosition.x -= 7
        cameraPosition.y += 4

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(ballPosition)
        cameraTarget.y += 0.5

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)
        
        //Phases

        if (ballPosition.x > blocksCount * 4 + 2 ) {end()}
        if (ballPosition.y < - 2  ) {restart()}

    })

    return <>
    <RigidBody 
        ref={ball}
        colliders="ball" 
        position={position}
        restitution={0}
        friction={0.5} 
        linearDamping={0.5}
        angularDamping={0.5}
        canSleep={false}   
    >
        <mesh castShadow receiveShadow >
            <icosahedronGeometry args={[radius,2]}/>
            <meshStandardMaterial color="#FF931E" flatShading={true} />
        </mesh>
    </RigidBody>
    </>
}
 


    