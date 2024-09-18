import { Complex } from "mathjs";

export interface Signal {
  value: number[] | Complex[];
  samplingRate: number;
  fourier?: Complex[];
}
