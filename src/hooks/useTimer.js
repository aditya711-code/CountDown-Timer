import { useState, useRef, useEffect } from "react";

export const useTimer = (initialTime) => {
  const [timeInput, setTimeInput] = useState(initialTime || "00:00:00");
  const [timer, setTimer] = useState(0);
  const [pause, setPause] = useState(false);
  const [start, setStart] = useState(false);
  let interval = useRef(null);

  useEffect(() => {
    if (pause || timer === 0) {
      clearInterval(interval.current);
    } else if (start && !pause) {
      startTimer();
    }

    return () => clearInterval(interval.current);
  }, [pause, timer, start]);

  const startTimer = () => {
    interval.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  const onPause = () => {
    setPause(!pause);
  };

  const onReset = () => {
    setStart(false);
    setTimer(convertTimeToSeconds(timeInput));
    clearInterval(interval.current);
  };

  const handleStart = () => {
    setStart(true);
    setTimer(convertTimeToSeconds(timeInput));
    startTimer();
  };

  const convertTimeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  return {
    timeInput,
    setTimeInput,
    timer,
    setTimer,
    pause,
    start,
    onPause,
    onReset,
    handleStart,
    convertTimeToSeconds,
  };
};
