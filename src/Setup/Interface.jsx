import { useKeyboardControls } from "@react-three/drei"
import useGame from "../stores/useGame"
 

export default function Interface()
{
    const restart = useGame((selector) => selector.restart)
    const phase = useGame((selector)=> selector.phase)

    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    return <div className="interface">
        {/* Time */}
        <div className="time">0.00</div>
        {/* Restart */}
        { phase === 'ended' && <div className="restart" onClick={restart}>RESTART</div>
}
        
        <div className="controls">
            <div className="rawW">
                <div className={`key ${forward ? 'active' : '' }`}>W</div>
            </div>
            <div className="raw">
                <div className={`key ${leftward ? 'active' : '' }`}>A</div>
                <div className={`key ${backward ? 'active' : '' }`}>S</div>
                <div className={`key ${rightward ? 'active' : '' }`}>D</div>
            </div>
            <div className="raw">
                <div className={`key large ${jump ? 'active' : '' }`}>SPACE</div>
            </div>
        </div>

    </div>
}
