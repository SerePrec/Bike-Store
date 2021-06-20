import React, { useState } from "react";
import plus from "../../assets/img/plus.svg";
import chevronUp from "../../assets/img/chevron-up.svg";
import chevronDown from "../../assets/img/chevron-down.svg";

import "./ButtonScroll.scss";

const ButtonScroll = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(active => !active);
  };

  const scrollTop = () => {
    const scrollOptions = {
      left: 0,
      top: 0,
      behavior: "smooth"
    };
    window.scrollTo(scrollOptions);
  };

  const scrollBottom = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const scrollOptions = {
      left: 0,
      top: scrollHeight,
      behavior: "smooth"
    };
    window.scrollTo(scrollOptions);
  };

  return (
    <div
      className={`buttonScroll ${active ? "active" : null}`}
      onClick={handleClick}
    >
      <div className="buttonScroll__link">
        <img src={plus} alt=""></img>
      </div>
      <menu className="buttonScroll__dropDown">
        <div className="buttonScroll__item" onClick={scrollTop}>
          <img src={chevronUp} alt=""></img>
        </div>
        <div className="buttonScroll__item" onClick={scrollBottom}>
          <img src={chevronDown} alt=""></img>
        </div>
      </menu>
    </div>
  );
};

export default ButtonScroll;
