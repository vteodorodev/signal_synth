import { Complex } from "mathjs";
import { Fourier } from "../utils/fourier";

export type NumberOrComplex = number | Complex;

export type RealSignal = number[];
export type FourierSignal = FourierDataPoint[];

export interface Signal {
  signal: RealSignal;
  samplingRate: number;
  fourier?: FourierSignal;
}

export interface DataPoint {
  x: number;
  y: number;
}

export interface FourierDataPoint {
  w: number;
  re: number;
  im: number;
  r: number;
  k: number;
  phi: number | undefined;
}

export type Dataset = Complex[] | number[];

export type Waveform = "sine" | "square" | "triangular" | "sawtooth" | "custom";

export type SignalContextType = {
  signal: RealSignal;
  fourier: FourierSignal;
  setSignal: (signal: RealSignal) => void;
  setFourier: (fourier: FourierSignal) => void;
};

export type StemChartType = "time" | "magnitude" | "phase";

export interface StemChartProps {
  data: RealSignal | FourierSignal;
  type: StemChartType;
}

export interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface Layout {
  width: number;
  height: number;
}
