import React from "react";
import "./Error404.css";
import GIF from "./gif.gif";

function Error404() {
  return (
    <div className="Error404-main">
      <div className="Error404-description-main">
        <div className="Error404-description">ERROR 404</div>
        <div className="Error404-description">Zgubiłeś się?</div>
      </div>
      <div>
        <img className="Error404-description-IMG" src={GIF} />
      </div>
    </div>
  );
}

export default Error404;
