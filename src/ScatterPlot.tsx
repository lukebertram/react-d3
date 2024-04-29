import * as d3 from "d3";

import Chart from "./Chart/Chart";
import Circles from "./Chart/Circles";
import Axis from "./Chart/Axis";
import { useChartDimensions } from "./utils/chartUtils";

const defaultXAccessor = (d) => d.x;
const defaultYAccessor = (d) => d.y;

type ScatterPlotProps = {
  data: Datum[];
  xAccessor: Accessor;
  yAccessor: Accessor;
  xLabel: string;
  yLabel: string;
};

const ScatterPlot = ({
  data,
  xAccessor = defaultXAccessor,
  yAccessor = defaultYAccessor,
  xLabel,
  yLabel,
}: ScatterPlotProps) => {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
  });

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  const keyAccessor = (d, i) => i;

  return (
    <div className="ScatterPlot" ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          dimensions={dimensions}
          dimension="x"
          scale={xScale}
          label={xLabel}
        />
        <Axis
          dimensions={dimensions}
          dimension="y"
          scale={yScale}
          label={yLabel}
        />
        <Circles
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
    </div>
  );
};

export default ScatterPlot;
