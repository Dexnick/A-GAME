
import {
    boxGeometry,
    InOutMaterial,
    widthFloor,
    heigthFloor,
    depthFloor 
    } from '../setup/Level.jsx'

export default function Start({ position=[0,0,0] })
{
    return <mesh 
        position={position}
        geometry={boxGeometry} 
        material={InOutMaterial} 
        scale={[heigthFloor,depthFloor,widthFloor]}
        receiveShadow
            />

}


