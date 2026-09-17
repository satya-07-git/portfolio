import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I am a passionate computer science student specializing in
              <i>
                <b className="purple"> IoT &amp; Cybersecurity </b>
              </i>
              at <b className="purple">C V Raman Global University</b>, Bhubaneswar.
              <br />
              <br />
              I have a strong foundation in
              <i>
                <b className="purple"> C language, Linux command line basics, and system fundamentals</b>
              </i>
              — always eager to explore the intersection of hardware, networks, and software security.
              <br />
              <br />
              My key areas of interest include developing
              <i>
                <b className="purple">
                  {" "}
                  IoT Solutions, Cybersecurity defense,{" "}
                </b>
              </i>
              and building innovative real-world safety models.
              <br />
              <br />
              I was also honored as a
              <i>
                <b className="purple"> Finalist at the NIST Science Exhibition (2023) </b>
              </i>
              for designing and demonstrating a working model for train and railway accident prevention.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
