import React from "react";
import { Carousel } from "react-bootstrap";
import imgCarousel1 from "../../assets/img/Carousel1.jpeg";
import imgCarousel2 from "../../assets/img/Carousel2.jpeg";
import imgCarousel3 from "../../assets/img/Carousel3.jpeg";
import imgCarousel4 from "../../assets/img/Carousel4.jpeg";
import "./LandingCarousel.scss";

const LandingCarousel = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={imgCarousel1} alt="First slide" />
        <Carousel.Caption>
          <h3>Ciclismo es aire libre</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={imgCarousel2} alt="Second slide" />

        <Carousel.Caption>
          <h3>Ciclismo es compartir</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={imgCarousel3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Ciclismo es adrenalina</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={imgCarousel4} alt="First slide" />
        <Carousel.Caption>
          <h3>Ciclismo es dedicación</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default LandingCarousel;
