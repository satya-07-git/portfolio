import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import {
  AiOutlineMail,
} from "react-icons/ai";
import { FaLinkedinIn, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> SATYAJEET KUMAR</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />

      <Container>
        <Row style={{ paddingTop: "50px", paddingBottom: "80px" }}>
          <Col md={12} className="home-about-social">
            <h1>Find Me On</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/satyajeet-kumar-29339638a"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:satyajeet5219@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="Email"
                >
                  <AiOutlineMail />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="tel:+918144976360"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="Phone"
                >
                  <FaPhoneAlt />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://wa.me/918144976360"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </li>
            </ul>
            <div style={{ marginTop: "20px", color: "white", fontSize: "1.05rem" }}>
              <p style={{ margin: "6px 0" }}>
                📧 <a href="mailto:satyajeet5219@gmail.com" style={{ color: "#cd5ff8", textDecoration: "none" }}>satyajeet5219@gmail.com</a>
              </p>
              <p style={{ margin: "6px 0" }}>
                📱 <a href="tel:+918144976360" style={{ color: "#cd5ff8", textDecoration: "none" }}>+91 8144976360</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
