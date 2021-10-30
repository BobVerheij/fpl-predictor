import React from "react";
import * as ball from "../../../public/animations/fpl-ball.json";
import Lottie from "react-lottie-segments";

const LoadingAnimation = () => {
  const loopOptions = {
    loop: true,
    autoplay: true,
    animationData: ball,
    width: 100,
    height: 100,
    rendererSettings: {
      className: "animation",
    },
  };

  return (
    <Lottie
      style={{ width: "80vw", maxWidth: "400px", padding: "8px" }}
      height={200}
      options={loopOptions}
    />
  );
};

export default LoadingAnimation;
