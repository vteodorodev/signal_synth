import { useEffect, useState } from "react";

export function useContainerDimensions(ref: React.RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => {
      if (!ref.current) {
        return { width: 0, height: 0 };
      } else {
        const { width, height } = ref.current.getBoundingClientRect();
        console.log(width, height);
        return { width, height };
      }
    };

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return dimensions;
}
