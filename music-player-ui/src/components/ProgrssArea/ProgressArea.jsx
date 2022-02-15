import React from "react";
import "./ProgressArea.scss";
function ProgressArea(props, ref) {


  return (
    <div className="progress-area">
      <div className="progress-bar">
        <audio
          autoPlay
        ></audio>
      </div>
      <div className="music-timer">
        <span>00:00</span>
        <span>00:00</span>
      </div>
    </div>
  );
}

export default ProgressArea;
