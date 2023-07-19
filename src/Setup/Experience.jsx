import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import Lights from './Lights.jsx'
import useGame from '../stores/useGame.jsx'

import Level from './Level.jsx'
import Player from '../Player.jsx'


export default function Experience()
{
    const blocksCount = useGame((state)=> state.blocksCount)
    const blocksSeed = useGame((state)=> state.gameSeed)
   
    
    return <>
        {/* Setup */}
        <color args={["#000000"]} attach="background"/>
        <OrbitControls makeDefault />
        <Lights />
        <Perf position={"top-left"}/>

        {/* Game */}
        <Physics debug={false}>  
            <Player position={[0,0.7,0]}/>
            <Level count={blocksCount} seed={blocksSeed}/>
        </Physics>

    </>
}