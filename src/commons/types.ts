import { Complex } from "mathjs";

export type NumberOrComplex = number | Complex;

export interface Signal {
  signal: number[] | Complex[];
  samplingRate: number;
  fourier?: Complex[];
}

export interface DataPoint {
  x: number;
  y: number;
}

export type Dataset = NumberOrComplex[];

export type Waveform = "sine" | "square" | "triangular" | "sawtooth" | "custom";

export type SignalContextType = {
  signal: NumberOrComplex[];
  fourier: NumberOrComplex[];
  setSignal: (signal: NumberOrComplex[]) => void;
  setFourier: (fourier: NumberOrComplex[]) => void;
};
