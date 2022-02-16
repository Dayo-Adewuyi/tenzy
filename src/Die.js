import React from "react";

const Die = (props) => {
  return (
    <div className="die">
      <h1 onClick={props.dieHeld} className={props.held ? "held" : ""}>
        {props.value}
      </h1>
    </div>
  );
};

export default Die;
