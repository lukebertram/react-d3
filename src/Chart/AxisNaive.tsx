import { useRef } from "react";
import * as d3 from "d3";
import { useDimensionsContext } from "./Chart";

type AxisNaiveProps = {
  dimension: "x" | "y";
  scale:
    | (number[] & d3.ScaleLinear<number, number, never>)
    | (Date[] & d3.ScaleTime<number, number, never>);
};

/* This component represents a hacky and undesirable way of using d3
 * DOM manipulation within React. Although this practice should generally be
 * avoided, the pattern can be useful "in a pinch". So I'm leaving this
 * example here for future reference. - LB
 */
const Axis = ({ dimension = "x", scale, ...props }: AxisNaiveProps) => {
  const ref = useRef<SVGGElement>();
  const dimensions = useDimensionsContext();
  const axisGenerator =
    dimension === "x" ? d3.axisBottom(scale) : d3.axisLeft(scale);

  if (ref.current) {
    d3.select(ref.current).transition().call(axisGenerator);
  }

  return (
    <g
      {...props}
      ref={ref}
      className="Axis"
      transform={
        dimension === "x" ? `translate(0, ${dimensions.boundedHeight})` : ""
      }
    />
  );
};

export default Axis;
