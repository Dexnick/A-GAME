import './style.css'
import ReactDOM from 'react-dom/client'
import Experience from '../Experience.jsx'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        map={ [
            { name:'forward', keys: ['ArrowUp', 'KeyW'] },
            { name:'backward', keys: ['ArrowUp', 'KeyS'] },
            { name:'leftward', keys: ['ArrowUp', 'KeyA'] },
            { name:'rightward', keys: ['ArrowUp', 'KeyD'] },
            { name:'jump', keys: ['Space'] }
        ]}
    >
    <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ -4, 7, 0 ]
        } }
    >
        <Experience count={8}/>
    </Canvas>
    </KeyboardControls>
)