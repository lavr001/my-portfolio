import { useState, useEffect } from "react";

const useVisualViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState(null);

  useEffect(() => {
    const updateHeight = () => {
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
      } else {
        setViewportHeight(window.innerHeight);
      }
    };

    if (typeof window !== "undefined" && window.visualViewport) {
      updateHeight();
      window.visualViewport.addEventListener("resize", updateHeight);
      window.visualViewport.addEventListener("scroll", updateHeight);

      return () => {
        window.visualViewport.removeEventListener("resize", updateHeight);
        window.visualViewport.removeEventListener("scroll", updateHeight);
      };
    } else if (typeof window !== "undefined") {
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }
  }, []);

  return viewportHeight;
};

export default useVisualViewportHeight;
