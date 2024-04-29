import { useState } from "react";
import * as d3 from "d3";
import { getTimelineData, getScatterData } from "./utils/dummyData";
// import { useInterval } from "usehooks-ts";

import Timeline from "./Timeline";
import Histogram from "./Histogram";
import "./App.css";

const parseDate = d3.timeParse("%m/%d/%Y");
const dateAccessor = (d: DateDatum) => parseDate(d.date);
const temperatureAccessor = (d: WeatherDatum) => d.temperature;
const humidityAccessor = (d: Datum) => d.humidity;

const getData = () => ({
  timeline: getTimelineData(),
  scatter: getScatterData(),
});

function App() {
  const [data, setData] = useState(getData());

  // useInterval(() => {
  //   setData(getData());
  // }, 8000);

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <div className="App__charts">
        <Timeline
          data={data.timeline}
          xAccessor={dateAccessor}
          yAccessor={temperatureAccessor}
          label="Temperature"
        />
        <Histogram
          data={data.scatter}
          xAccessor={humidityAccessor}
          label="Humidity"
        />
      </div>
    </div>
  );
}

export default App;
