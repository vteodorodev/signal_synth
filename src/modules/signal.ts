const pi = Math.PI;

export type Wave = "sine" | "square" | "triangular" | "sawtooth" | "custom";

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
