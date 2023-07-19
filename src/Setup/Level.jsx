import { useMemo } from 'react'
import * as THREE from 'three'


//PARTS OF LEVEL
import Start from '../leveldesign/Start.jsx'
import End  from '../leveldesign/End.jsx'
import TwisterBlock  from '../leveldesign/Twister.jsx'
import LimboBlock  from '../leveldesign/LimboBlock.jsx'
import AxeBlock  from '../leveldesign/AxeBlock.jsx'
import Floor  from '../leveldesign/Floor.jsx'


//Materials and Geometry
export const boxGeometry = new THREE.BoxGeometry(1,1,1)
export const InOutMaterial = new THREE.MeshStandardMaterial({color:"#4D1029"})
export const pathMaterial = new THREE.MeshStandardMaterial({color:"#AAFAFF"})
export const obstaclesMaterial = new THREE.MeshStandardMaterial({color:"#A12700"})
export const wallsMaterial = new THREE.MeshStandardMaterial({color:"#1C0F03"})
//Measures
export const widthFloor = 4
export const heigthFloor = 4
export const depthFloor = 10
export const heightWalls = 8
//Physics
export const restitution = 0
export const friction = 1

export default function Level({count=0, types=[TwisterBlock,LimboBlock,AxeBlock], seed = 0})
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
    },[count, types, seed])
    return<>
        <Start position={[0,-5,0]}/>
        { 
            blocks.map((Block,index)=>
                <Block 
                    key={index} 
                    position={[4+(index*4) ,-5,0]}
                 />
            )
        }
        <End position={[(count+1)*4,-5,0]}/>
        <Floor length={count+2}/>   
    </>
}