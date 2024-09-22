import { Complex } from "mathjs";
import { FourierDataPoint, NumberOrComplex, RealSignal, Signal, Waveform } from "../commons/types";
import { Fourier } from "./fourier";

export const pi = Math.PI;

export class Wave implements Signal {
  signal: RealSignal;
  samplingRate: number;
  fourier?: FourierDataPoint[];
  fft: Fourier;

  constructor(
    wave: Waveform,
    frequency: number,
    amplitude: number,
    phase: number,
    samplingRate: number,
    length: number
  ) {
    this.samplingRate = samplingRate;
    this.fft = new Fourier(length);

    switch (wave) {
      case "sine":
      case "square":
      case "triangular":
      case "sawtooth":
      case "custom":
        this.signal = [] as number[];
        for (let n = 0; n < length; n++) {
          const val = amplitude * Math.sin((2 * pi * frequency * n) / samplingRate - phase);
          this.signal.push(val);
        }
    }
  }

  computeFourier() {
    this.fourier = this.fft.forward(this.signal, this.samplingRate);
    return this.fourier;
  }
}

/* export class Signal {
  wave: Wave;
  frequency: number;
  amplitude: number;
  phase: number;
  duration: number;
  samplingFrequency: number;
  harmonics: number;
  fourierGenerator: (k: number, N: number) => number;
  fourier: [number, number][];
  signal: any;

  constructor(
    wave: Wave,
    frequency: number,
    amplitude: number,
    phase: number,
    duration: number,
    harmonics: number,
    { samplingFrequency }: { samplingFrequency?: number }
  ) {
    this.wave = wave;
    this.frequency = frequency;
    this.amplitude = amplitude;
    this.phase = phase;
    this.duration = duration;
    this.harmonics = harmonics;
    this.samplingFrequency = samplingFrequency ? samplingFrequency : 3 * harmonics * frequency;
    this.fourier = [];

    switch (wave) {
      case "sine":
        this.fourierGenerator = (k: number, N: number) => (k === 1 ? Math.sin(2 * pi * N) : 0);
        break;
      case "square":
        this.fourierGenerator = (k: number, N: number) => 4 / pi / (2 * k - 1);
        break;
      case "triangular":
        this.fourierGenerator = (k: number, N: number) =>
          -(((8 / pi ** 2) * (-1) ** k) / (2 * k - 1) ** 2);
        break;
      case "sawtooth":
        this.fourierGenerator = (k: number, t: number) => -(((2 / pi) * (-1) ** k) / k);
        break;
      case "custom":
        this.fourierGenerator = (k: number, t: number) => 0;
    }
  }

  generate() {
    const arr = [];
    const numOfSamples = Math.floor(this.samplingFrequency * this.duration);

    for (let i = 0; i < numOfSamples; i++) {
      let val = 0;
      for (let k = 1; k <= this.harmonics; k++) {
        val += this.amplitude * this.fourierGenerator(k, i / this.samplingFrequency);
      }
      arr.push(val);
    }

    return arr;
  }

  reverse() {}
} */
