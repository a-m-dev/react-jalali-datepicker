import { useState, useEffect } from "react";

const useMediaQuery = (props) => {
  const isWindow = typeof window === "object";
  const [wX, setWX] = useState(isWindow ? window.innerWidth : undefined);

  useEffect(() => {
    function setSize() {
      setWX(window.innerWidth);
    }

    if (isWindow) {
      window.addEventListener("resize", setSize);

      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindow, setWX]);

  return {
    isMobile: wX < 576,
    isTablet: wX >= 576 && wX < 1024,
    isPc: wX >= 1024,
  };
};

export default useMediaQuery;
