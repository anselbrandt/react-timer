import React, { useRef, useState, useEffect } from "react";

const Counter = () => {
  const frame = useRef<number | undefined>();
  const last = useRef(performance.now());
  const [totalTime, setTotalTime] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  function pad(num: number) {
    return num.toString().padStart(2, "0");
  }

  function msToTime(ms: number) {
    const sec = ms / 1000;
    const hh = Math.floor(sec / 3600);
    const mm = Math.floor((sec - hh * 3600) / 60);
    const ss = (sec - hh * 3600 - mm * 60).toFixed(1);
    return `${pad(hh)}:${pad(mm)}:${ss}`;
  }

  useEffect(() => {
    const animate = () => {
      const now = performance.now();
      const delta = now - last.current;
      if (!isPaused) {
        setCounter((prev) => prev + delta);
      }
      setTotalTime((prev) => prev + delta);
      last.current = now;
      frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current as number);
  }, [isPaused]);

  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <>
      <div>
        {isPaused ? "Paused" : "Running"} {msToTime(counter)} s
      </div>
      <div>Total {msToTime(totalTime)} s</div>
      <div>
        <button onClick={handleClick}>{isPaused ? "Resume" : "Pause"}</button>
      </div>
    </>
  );
};

export default Counter;
