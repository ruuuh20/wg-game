import React from "react";
import Diagram from "./Diagram";

export default turns => {
  let props = {
    head: turns <= 5,
    body: turns <= 4,
    leftArm: turns <= 3,
    rightArm: turns <= 2,
    leftLeg: turns <= 1,
    rightLeg: turns === 0
  };

  return <Diagram {...props} />;
};
