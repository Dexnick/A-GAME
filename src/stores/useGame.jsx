import {create} from 'zustand'
import {subscribeWithSelector} from 'zustand/middleware'

export default create(subscribeWithSelector((set)=>
{
    let infinity = 1
    return {
       
        blocksCount: infinity,
        gameSeed: 0, 
        //Time
        startTime:0,
        endTime:0,

        //Phases 
        phase: 'ready',

        start: () =>
        {
            set((state)=> {
                if(state.phase === 'ready')
                    return { phase: 'playing', startTime: Date.now() }
                return {}
            })
        },

        restart: () =>
        {
            set((state)=> {
                if(state.phase === 'playing' || state.phase === 'ended')
                    return { phase: 'ready', gameSeed: Math.random(),blocksCount: infinity+=1 }
                return{}
            })
        },

        end: () =>
        {
            set((state)=> {
                if(state.phase === 'playing')
                    return { phase: 'ended', endTime: Date.now()} 
                return {}
            })
        },
        
    }
}))