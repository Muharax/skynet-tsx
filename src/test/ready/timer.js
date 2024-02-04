import React, { useState, useEffect, useRef } from 'react';
import './test.css';

const Timer = ({ time, round }) => {
  const [remainingTime, setRemainingTime] = useState(time);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      if (!startTimeRef.current) {
        startTimeRef.current = performance.now();
      }

      const duration = time * 1000;

      const animateTimer = (currentTime) => {
        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(1, elapsed / duration);

        setRemainingTime(Math.max(0, time - Math.floor(time * progress)));

        const border = timerRef.current.querySelector('.border');

        // Zmiana koloru obramowania w zależności od procentu pozostałego czasu
        const percentRemaining = remainingTime / time;
        const color = percentRemaining <= 0.1 ? 'red' : percentRemaining <= 0.5 ? 'orange' : 'green';
        border.style.borderColor = color;

        // Zmiana długości obramowania w miarę upływu czasu
        border.style.strokeDashoffset = (1 - progress) * round * Math.PI;

        if (progress < 1) {
          requestAnimationFrame(animateTimer);
        }
      };

      requestAnimationFrame(animateTimer);
    }
  }, [time, round, remainingTime]);

  const circleStyles = {
    width: round,
    height: round,
  };

  const borderStyles = {
    width: `calc(100% - 10px)`,
    height: `calc(100% - 10px)`,
    top: '5px',
    left: '5px',
    borderRadius: '50%',
    borderColor: 'transparent',
    position: 'absolute',
    transition: 'border-color 0.3s',  // Dodane przejście koloru obramowania
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className="timer" ref={timerRef}>
        <div className="circle" style={{ ...circleStyles }}>
          <div
            className="mask full"
            style={{ ...borderStyles, transform: 'rotate(180deg)' }}
          ></div>
          <div
            className="mask half"
            style={{ ...borderStyles, transform: 'rotate(0deg)' }}
          ></div>
          <div
            className="border"
            style={{ ...borderStyles, border: `5px solid #3498db` }}
          ></div>
        </div>
        <div className="digit">{remainingTime}</div>
      </div>
    </div>
  );
};

export default Timer;
