import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiOutlineMail,
} from "react-icons/ai";
import { FaLinkedinIn, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by Satyajeet Kumar</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} SK</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/satyajeet-kumar-29339638a"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="mailto:satyajeet5219@gmail.com"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
                title="Email"
              >
                <AiOutlineMail />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="tel:+918144976360"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
                title="Phone"
              >
                <FaPhoneAlt />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://wa.me/918144976360"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
