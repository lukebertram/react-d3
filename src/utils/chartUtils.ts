import { useEffect, useState, useRef, ElementRef } from "react";

export const callAccessor = (
  accessor: Accessor,
  d: Record<string, unknown>,
  i: number
) => (typeof accessor === "function" ? accessor(d, i) : accessor);

export const getBoundedDimensions = (dimensions = {}): BoundedDimensions => {
  // apply default margins if unspecified in input
  const parsedDimensions = {
    width: 0,
    height: 0,
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75,
    ...dimensions,
  };

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0
    ),
  };
};

export const useChartDimensions = (
  passedDimensions?: BaseDimensions
): [React.RefObject<HTMLDivElement>, BoundedDimensions] => {
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = getBoundedDimensions(passedDimensions);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // if (dimensions.width && dimensions.height) return [ref, dimensions]
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width !== entry.contentRect.width) {
        setWidth(entry.contentRect.width);
      }
      if (height !== entry.contentRect.height) {
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, [passedDimensions, height, width, dimensions]);

  const newDimensions = getBoundedDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newDimensions];
};

let lastId = 0;
export const useUniqueId = (prefix = "") => {
  lastId++;
  return [prefix, lastId].join("-");
};
