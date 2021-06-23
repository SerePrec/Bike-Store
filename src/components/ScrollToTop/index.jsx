import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollOptions = {
  left: 0,
  top: 0,
  behavior: "smooth"
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(scrollOptions);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
