const pi = Math.PI;

export type Wave = "sine" | "square" | "triangular" | "sawtooth";

export class WaveSignal {
  wave: Wave;
  frequency: number;
  amplitude: number;
  phase: number;
  duration: number;
  samplingFrequency: number;
  harmonics: number;
  fourier: (k: number, t: number) => number;

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

    switch (wave) {
      case "sine":
        this.fourier = (k: number, t: number) => (k === 1 ? Math.sin(2 * pi * t) : 0);
        break;
      case "square":
        this.fourier = (k: number, t: number) =>
          ((4 / pi) * Math.sin(2 * pi * (2 * k - 1) * t)) / (2 * k - 1);
        break;
      case "triangular":
        this.fourier = (k: number, t: number) =>
          -((((8 / pi ** 2) * (-1) ** k) / (2 * k - 1) ** 2) * Math.sin(2 * pi * (2 * k - 1) * t));
        break;
      case "sawtooth":
        this.fourier = (k: number, t: number) =>
          -((((2 / pi) * (-1) ** k) / k) * Math.sin(2 * pi * k * t));
    }
  }

  generate() {
    const arr = [];
    const numOfSamples = Math.floor(this.samplingFrequency * this.duration);

    for (let i = 0; i < numOfSamples; i++) {
      let val = 0;
      for (let k = 1; k <= this.harmonics; k++) {
        val += this.amplitude * this.fourier(k, i / this.samplingFrequency);
      }
      arr.push(val);
    }

    return arr;
  }
}
