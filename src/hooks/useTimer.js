//starting timer
//pausing timer
//resetting it
import { useState } from "react";
import { useRef } from "react";
export const useTimer=({timer})=>{
    const value=parseInt(timer[0]+timer[1])*3600+parseInt(timer[3]+timer[4])*60+parseInt(timer[6]+timer[7]);
    const[time,setTime]=useState(0);
    const decreaseTimer=()=>{
        console.log("decrement",time)
        if(time!==0){
            setTime((time)=>(time-1));
        }
    }

    return {time,setTime,decreaseTimer};




    
}