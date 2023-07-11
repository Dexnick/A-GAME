import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef} from "react";



export default function Player({position=[0,0,0]})
{
    const ball = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const {rapier, world} = useRapier()
        
    const jump = ()=>
    {
        const origin = ball.current.translation()
        origin.y -= 0.51
        const rayDirection = {x:0, y:-1 ,z:0}
        const ray = new rapier.Ray(origin,rayDirection)
        const hit = world.castRay(ray, 10, true)

        if (hit.toi < 0.15 ) 
        ball.current.applyImpulse({x:0, y:3, z:0})
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
        return () =>
        {
            unsubscribeJump()
        }
    },[])

    useFrame((state,delta)=>
    {
        const {forward, backward, leftward, rightward} = getKeys()

        const impulse = {x:0 , y:0, z: 0 }
        const torque = {x:0 , y:0, z: 0 }
        
        const impulseStrength = 1.5 * delta
        const torqueStrength = 0.5 * delta

        if (forward) 
        {
            impulse.x += impulseStrength  
            torque.z -= torqueStrength  
        }
        if (backward) 
        {
            impulse.x -= impulseStrength  
            torque.z += torqueStrength  
        }
        if (leftward) 
        {
            impulse.z -= impulseStrength  
            torque.x -= torqueStrength  
        }
        if (rightward) 
        {
            impulse.z += impulseStrength  
            torque.x += torqueStrength  
        }

        ball.current.applyImpulse(impulse)
        ball.current.applyTorqueImpulse(torque)
        
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
        <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.5,32,16]}/>
            <meshStandardMaterial color="#FF931E" />
        </mesh>
    </RigidBody>
    </>
}

    