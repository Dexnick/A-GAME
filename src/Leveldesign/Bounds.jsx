import { CuboidCollider, RigidBody } from "@react-three/rapier";
import {
    boxGeometry,
    wallsMaterial,
    restitution,
    friction,
    widthFloor,
    heigthFloor,
    depthFloor,
    heightWalls
    } from '../setup/Experience.jsx'


export default function Bounds({length=1})
{
    return<>

        <RigidBody type={"fixed"} >
            <mesh 
                geometry={boxGeometry}
                material={wallsMaterial} 
                position={[(length*2)-2,2,2.25]}
                scale={[4*length,heightWalls,0.5]}
                castShadow
            />
            <mesh
                castShadow
                geometry={boxGeometry}
                material={wallsMaterial} 
                position={[(length*2)-2,2,-2.25]}
                scale={[4*length,heightWalls,0.5]}
            />
            <mesh 
                castShadow
                geometry={boxGeometry}
                material={wallsMaterial} 
                position={[(4*length)-1.75,2,-0]}
                scale={[0.5,heightWalls,5]}
            />
            <CuboidCollider 
                args={[(heigthFloor/2)*length, 0.1, widthFloor/2]}
                position={[(length*2)-2, -0.1, 0]}
                restitution={restitution} 
                friction={1}
            />
            <CuboidCollider 
                args={[(heigthFloor/2)*length, depthFloor/2, widthFloor/2]}
                position={[(length*2)-2,heightWalls+0.1,0]}
                restitution={restitution} 
                friction={friction}
            />
            <CuboidCollider 
                args={[0.25, heightWalls/2, widthFloor/2]}
                position={[-2.25,2,0]}
                restitution={restitution} 
                friction={friction}
            />

        </RigidBody>
              
    </>
}