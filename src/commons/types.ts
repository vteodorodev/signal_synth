import { Complex } from "mathjs";

export interface Signal {
  signal: number[] | Complex[];
  samplingRate: number;
  fourier?: Complex[];
}

export type Waveform = "sine" | "square" | "triangular" | "sawtooth" | "custom";
