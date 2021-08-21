import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container>
        <Row>
          <Col className="text-center">
            <h3>poemSocial</h3>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">Created by Van Nguyen</Col>
        </Row>
        <Row>
          <Col className="text-center">All right reserved</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
