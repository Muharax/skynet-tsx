import React, { useState, useEffect } from 'react';
import './test.css';

type CountdownProps = {
  seconds: number;
  size: number;
  strokeBgColor: string;
  strokeColor: string;
  strokeWidth: number;
  backgroundImageSrc?: string; // Dodane pole na ścieżkę do tła obrazu
};

const CountdownTimer: React.FC<CountdownProps> = (props) => {
  const {
    seconds,
    size,
    strokeBgColor,
    strokeColor,
    strokeWidth,
    backgroundImageSrc, // Dodane pole na ścieżkę do tła obrazu
  } = props;

  const milliseconds = seconds * 1000;
  const radius = size / 2;
  const circumference = size * Math.PI;

  const [countdown, setCountdown] = useState(milliseconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 10 : 0
      );
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const strokeDashoffset = () =>
    circumference - (countdown / milliseconds) * circumference;

  const countdownSizeStyles = {
    height: size,
    width: size,
    backgroundImage: props.backgroundImageSrc ? `url(${props.backgroundImageSrc})` : 'none', // Ustaw obraz tła, jeśli jest dostarczony
    backgroundSize: 'cover',
    borderRadius: '50%',
  };

  const textStyles = {
    color: strokeColor,
    fontSize: size * 0.3,
    position: 'relative',
    top: '-55%',
    left: '-55%',
  };

  const secondsRemaining = (countdown / 1000).toFixed();

  const backgroundStyles = {
    backgroundImage: `url(${backgroundImageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '50%', // Ustawienie okrągłego kształtu
  };

  return (
    <div>
      <div
        className="scale-hover"
        style={{
          ...backgroundStyles,
          pointerEvents: 'none',
          opacity: 0.4,
        }}
      ></div>
      <div
        style={Object.assign(
          {},
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            margin: 'auto',
          },
          countdownSizeStyles
        )}
      >
        <p style={textStyles}>{secondsRemaining}s</p>
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'rotateY(-180deg) rotateZ(-90deg)',
            overflow: 'visible',
          }}
        >
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="none"
            stroke={strokeBgColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'rotateY(-180deg) rotateZ(-90deg)',
            overflow: 'visible',
          }}
        >
          <circle
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset()}
            r={radius}
            cx={radius}
            cy={radius}
            fill="none"
            strokeLinecap="round"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default CountdownTimer;
