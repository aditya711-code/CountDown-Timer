import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTimer } from "./hooks/useTimer";

const Timer = () => {
  const {
    timeInput,
    setTimeInput,
    timer,
    pause,
    start,
    onPause,
    onReset,
    handleStart,
  } = useTimer("00:00:00");

  const handleKeyPress = (e) => {
    if (e.key === "Backspace") {
      const currentValue = timeInput.replace(/:/g, "");
      const newValue = currentValue.slice(0, -1).padStart(6, "0");
      const formattedValue = newValue.replace(
        /(\d{2})(\d{2})(\d{2})/,
        "$1:$2:$3"
      );
      setTimeInput(formattedValue);
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    } else {
      const newValue = (timeInput.replace(/:/g, "") + e.key).slice(-6); //
      const formattedValue = newValue.replace(
        /(\d{2})(\d{2})(\d{2})/,
        "$1:$2:$3"
      );
      setTimeInput(formattedValue);
    }
  };

  const formatTime = (time) => {
    let hours = String(Math.floor(time / 3600)).padStart(2, "0");
    let minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    let seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className='card'>
      <Card title='CountDown Timer'>
        {!start ? (
          <InputText
            type='text'
            value={timeInput}
            onKeyDown={handleKeyPress}
            placeholder='00:00:00'
            maxLength={8}
          />
        ) : (
          <h3 className='text-xl' style={{ fontSize: 28 }}>
            {formatTime(timer)}
          </h3>
        )}
        {!start ? (
          <Button
            style={{
              width: "80%",
              borderRadius: "18px",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
            onClick={handleStart}
          >
            <i className='pi pi-play' style={{ fontSize: "1rem" }}></i>
          </Button>
        ) : (
          <div
            className='btn'
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {!pause ? (
              <Button
                style={{
                  width: "30%",
                  borderRadius: "18px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
                onClick={onPause}
              >
                <i className='pi pi-pause' style={{ fontSize: "1rem" }}></i>
              </Button>
            ) : (
              <Button
                style={{
                  width: "30%",
                  borderRadius: "18px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
                onClick={onPause}
              >
                <i className='pi pi-play' style={{ fontSize: "1rem" }}></i>
              </Button>
            )}
            <Button
              style={{
                width: "30%",
                borderRadius: "18px",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
              onClick={onReset}
            >
              <i className='pi pi-refresh' style={{ fontSize: "1rem" }}></i>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Timer;
