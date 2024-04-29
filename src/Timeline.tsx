import * as d3 from "d3";

import Chart from "./Chart/Chart";
import Line from "./Chart/Line";
// import Axis from "./Chart/AxisNaive";
import { useChartDimensions } from "./utils/chartUtils";
import Axis from "./Chart/Axis";

const formatDate = d3.timeFormat("%-b %-d");

type TimelineProps = {
  data: Datum[];
  xAccessor: DateAccessor;
  yAccessor: TemperatureAccessor;
  label: string;
};

const Timeline = ({ data, xAccessor, yAccessor, label }: TimelineProps) => {
  const [ref, dimensions] = useChartDimensions();

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  const y0AccessorScaled = yScale(yScale.domain()[0]);

  console.log(dimensions);
  return (
    <div className="Timeline" ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          label="Date"
          dimension="x"
          scale={xScale}
          formatTick={formatDate}
        />
        <Axis label="Temperature" dimension="y" scale={yScale} />
        <Line
          type="area"
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          y0Accessor={y0AccessorScaled}
        />
        <Line
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
    </div>
  );
};

export default Timeline;
