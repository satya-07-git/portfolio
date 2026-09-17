import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I’m <span className="purple">Satyajeet Kumar</span>{" "}
            from <span className="purple">Bhubaneswar, Odisha, India</span>.
            <br />
            I am currently pursuing my <span className="purple">B.Tech in Computer Science and Engineering</span> with specialization in{" "}
            <span className="purple">IoT &amp; Cybersecurity</span> at{" "}
            <span className="purple">C V Raman Global University, Bhubaneswar</span> (CPI: <span className="purple">9.21</span>).
            <br />
            <br />
            A proud achievement of mine is being a{" "}
            <span className="purple">Finalist at the NIST Science Exhibition (2023)</span>,
            where I designed a working model elaborating train and railway accident causes and their automated prevention.
            <br />
            <br />
            Apart from technical learning, here are a few other areas I actively pursue:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Exploring IoT, Embedded Systems &amp; Cyber Defense 🛡️
            </li>
            <li className="about-activity">
              <ImPointRight /> Building Real-World Safety &amp; Engineering Models 🚂
            </li>
            <li className="about-activity">
              <ImPointRight /> Critical Thinking &amp; Collaborative Problem Solving 💡
            </li>
            <li className="about-activity">
              <ImPointRight /> Multilingual Communication (English, Hindi, Odia) 🗣️
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "To work in an organization which encourages me to succeed and indulges professionally where I can utilize my knowledge and skills appropriately."{" "}
          </p>
          <footer className="blockquote-footer">Satyajeet Kumar</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
