import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "B.Tech CSE (IoT & Cybersecurity)",
          "C Programmer",
          "Cybersecurity & IoT Enthusiast",
          "Tech Innovator",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
