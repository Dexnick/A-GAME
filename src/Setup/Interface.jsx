import { useKeyboardControls } from "@react-three/drei"
import { useEffect,useRef } from "react"
import { addEffect } from "@react-three/fiber"
import useGame from "../stores/useGame"
 

export default function Interface()
{
    const time = useRef()
    const restart = useGame((selector) => selector.restart)
    const phase = useGame((selector)=> selector.phase)

    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    useEffect(()=>
    {
        // When I create unsubscribeEffect, that prevent the case when the component is re-create to call twice or "accumulate" the same function
        const unsubscribeEffect = addEffect(()=>
        {
            const state = useGame.getState()

            let elapsedTime= 0 

            if (state.phase === 'playing')
                elapsedTime = Date.now() - state.startTime
            else if(state.phase === 'ended')
                elapsedTime = state.endTime - state.startTime

            elapsedTime /=1000
            elapsedTime = elapsedTime.toFixed(2)

            if(time.current)
                time.current.textContent = elapsedTime
        })
        
        return () => unsubscribeEffect()
    },[])

    return <div className="interface">
        {/* Time */}
        <div ref={time} className="time">0</div>
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
