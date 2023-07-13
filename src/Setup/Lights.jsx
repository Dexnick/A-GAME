import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Lights()
{
    const light = useRef()

    useFrame((state)=>
    {
        light.current.position.x = state.camera.position.x + 3
        light.current.target.position.x = state.camera.position.x + 3
        light.current.target.updateMatrixWorld()
    })

    return <>
        <directionalLight
            ref={light}
            castShadow
            position={ [ 0, 6, 2 ] }
            intensity={ 1.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 20 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 20 }
        />
        <ambientLight intensity={ 0.5 } />
    </>
}