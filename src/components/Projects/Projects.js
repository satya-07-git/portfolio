import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Railway Accident Prevention System"
              description="Finalist at the NIST Science Exhibition (2023). Elaborated the core causes of train and railway accidents and designed an automated prevention mechanism with a functional working model demonstrating collision mitigation and track safety."
              demoLink="https://www.linkedin.com/in/satyajeet-kumar-29339638a"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="IoT Smart Sensor & Alert System"
              description="An Internet of Things (IoT) prototype integrating sensors and microcontrollers for real-time telemetry monitoring, threshold detection, and automated alerting across connected endpoints."
              demoLink="https://www.linkedin.com/in/satyajeet-kumar-29339638a"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="C Language System Utilities"
              description="A suite of low-level C programs and command-line utilities built for Linux environments, demonstrating file I/O, custom memory handling, process control, and algorithmic efficiency."
              demoLink="https://www.linkedin.com/in/satyajeet-kumar-29339638a"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Cybersecurity Network Inspector"
              description="A network security exploration tool inspecting packet headers and analyzing basic telemetry to identify protocol anomalies and potential vulnerabilities in local network devices."
              demoLink="https://www.linkedin.com/in/satyajeet-kumar-29339638a"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
