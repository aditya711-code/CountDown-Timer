import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { useState,useEffect,useRef } from 'react';
import { InputText } from "primereact/inputtext";
import { useTimer } from './hooks/useTimer';
const Timer=()=>{
    const[timeInput,setTimeInput]=useState(0);
    const[timer,setTimer]=useState(timeInput);
    const[pause,setPause]=useState(false);
    const[start,setStart]=useState(false);
    let interval=useRef(null);


  useEffect(() => {
    if (pause || timer === 0) {
      clearInterval(interval.current);
    } else if (start && !pause) {
      startTimer();
    }

    return () => clearInterval(interval.current);
  }, [pause, timer, start]);

    // useEffect(()=>{
    //     console.log("Rendered and print pause",pause);
    //     if(pause){
    //         return ()=>clearInterval(interval.current);
    //     }
    // },[pause])

    const startTimer=()=>{
      interval.current=setInterval(()=>{
          setTimer((timer)=>(timer-1));
      },1000)
    }

    const onPause=()=>{
        setPause(!pause);
        console.log("onePause clicked", pause)
    }

    const getInput=(value)=>{
        setTimeInput(value);
        setTimer(value);
    }

    const onReset=()=>{
      setStart(false);
      setTimer(timeInput);
      clearInterval(interval.current);

    }
    const handleTimer=()=>{
        setStart(true);
        startTimer();
    }

    console.log("Time: ",timer);
    return (
      <div className='card'>
        <Card title='CountDown Timer'>
          {!start?
          <InputText
           type="number"
            value={timeInput}
            onChange={(e) => getInput(e.target.value)}
            placeholder='00:00:00'
          />:
          <h3 className='text-xl' style={{fontSize:28}}>{timer}</h3>
          }
          {!start?
          <Button
            style={{
              width: "80%",
              borderRadius: "18px",
              alignItems: "center",
              justifyContent: "center",
              marginTop:"20px",
            }}
            onClick={() => handleTimer()}
          >
            <i className='pi pi-play' style={{ fontSize: "1rem" }}></i>
          </Button>:
         <div className='btn' style={{display:'flex',justifyContent:'space-between'}}>
          {!pause?
            <Button
              style={{
                width: "30%",
                borderRadius: "18px",
                alignItems: "center", 
                justifyContent: "center",
                marginTop: "20px",
              }}
              onClick={() => onPause()}
            >
              <i className='pi pi-pause' style={{ fontSize: "1rem" }}></i>
             </Button> 
             :
             <Button
                  style={{
                    width: "30%",
                    borderRadius: "18px",
                    alignItems: "center", // Centers vertically
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                  onClick={() => onPause()}
                >
                  <i className='pi pi-play' style={{ fontSize: "1rem" }}></i>
                </Button>}
            <Button
              style={{
                width: "30%",
                borderRadius: "18px",
                alignItems: "center", // Centers vertically
                justifyContent: "center",
                marginTop: "20px",
              }}
              onClick={() => onReset()}
            >
              <i className='pi pi-refresh' style={{ fontSize: "1rem" }}></i>
            </Button>
         </div>}
          

        </Card>
      </div>
    );
}
export default Timer;