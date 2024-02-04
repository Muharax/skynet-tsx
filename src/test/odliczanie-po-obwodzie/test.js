import React, { lazy, Suspense, useState, useEffect } from "react";
import CountdownTimer from "./timer";
import "./test.css";
import logo from "../img/logos2.jpg";
import logo2 from "../img/logos3.jpg";
import logo3 from "../img/logos4.jpg";
import logo4 from "../img/logos5.jpg";
import logo5 from "../img/logos.jpg";

const Test = () => {
  return (
    <div className="ffa">
      <div>
        <CountdownTimer
          seconds={60}
          size={80}
          strokeBgColor="black"
          strokeColor="orange"
          strokeWidth={3}
          backgroundImageSrc={logo}
        />
      </div>
      <div>
        <CountdownTimer
          seconds={15}
          size={60}
          strokeBgColor="black"
          strokeColor="lemonchiffon"
          strokeWidth={2}
          backgroundImageSrc={logo2}
        />
      </div>
      <div>
        <CountdownTimer
          seconds={30}
          size={200}
          strokeBgColor="black"
          strokeColor="lightgreen"
          strokeWidth={12}
          backgroundImageSrc={logo5}
        />
      </div>
      <div>
        <CountdownTimer
          seconds={10}
          size={90}
          strokeBgColor="black"
          strokeColor="lightcoral"
          strokeWidth={4}
          backgroundImageSrc={logo3}
        />
      </div>
      <div>
        <CountdownTimer
          seconds={5}
          size={120}
          strokeBgColor="black"
          strokeColor="lavender"
          strokeWidth={8}
          backgroundImageSrc={logo4}
        />
      </div>
    </div>
  );
};

export default Test;
