// Global types
type Datum = Record<string, unknown>;

type DateDatum = Datum & {
  date: string;
};

type WeatherDatum = Datum & {
  date: string;
  temperature: number;
  humidity: number;
};

type XYDatum = Datum & {
  x: number | string;
  y: number | string;
};

type Accessor = (d: Datum, i?: number) => number;

type DateAccessor = (d: DateDatum, i?: number) => Date;

type TemperatureAccessor = (d: WeatherDatum, i?: number) => number;

type BaseDimensions = {
  height: number;
  width: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

type BoundedDimensions = BaseDimensions & {
  boundedHeight: number;
  boundedWidth: number;
};
