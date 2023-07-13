import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { useMemo } from 'react'
import Lights from './Setup/Lights.jsx'
import * as THREE from 'three'

//Level Begin
import Start from './Leveldesign/Start.jsx'
import End  from './Leveldesign/End.jsx'
import TwisterBlock  from './Leveldesign/Twister.jsx'
import LimboBlock  from './Leveldesign/LimboBlock.jsx'
import AxeBlock  from './Leveldesign/AxeBlock.jsx'
import Bounds  from './Leveldesign/Bounds.jsx'
import Player from './Player.jsx'

//Materials and Geometry
export const boxGeometry = new THREE.BoxGeometry(1,1,1)
export const InOutMaterial = new THREE.MeshStandardMaterial({color:"#4D1029"})
export const pathMaterial = new THREE.MeshStandardMaterial({color:"#AAFAFF"})
export const obstaclesMaterial = new THREE.MeshStandardMaterial({color:"#A12700"})
export const wallsMaterial = new THREE.MeshStandardMaterial({color:"#1C0F03"})
//Measures
export const widthFloor = 4
export const heigthFloor = 4
export const depthFloor = 0.2
export const heightWalls = 4
//Physics
export const restitution = 0
export const friction = 1

export default function Experience({count=1, types=[TwisterBlock,LimboBlock,AxeBlock]})
{
    const blocks = useMemo(()=>
    {
        const blocks = []
        for (let i = 0; i < count; i++) 
        {
            const generateLevel = types[Math.floor(Math.random()* types.length)]
            blocks.push(generateLevel)
        }
        return blocks
    },[count, types])


    return <>
        {/* Setup */}
        <OrbitControls makeDefault />
        <Lights />
        <Perf position={"top-left"}/>

        {/* Game */}
        <Physics debug={false}>  
            <Player position={[0,0.7,0]}/>
            <Start position={[0,-0.1,0]}/>
            { 
                blocks.map((Block,index)=>
                    <Block 
                        key={index} 
                        position={[4+(index*4) ,-0.1,0]} /> 
            )}
            <End position={[(count+1)*4,-0.1,0]}/>
            
            <Bounds length={count+2}/>    
        </Physics>

    </>
}