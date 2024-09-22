import { FourierDataPoint, NumberOrComplex, RealSignal, Signal } from "../commons/types";
import { Complex, pi, add, multiply, complex, conj } from "mathjs";

export class Fourier {
  windowSize: number;
  tol: number;
  private vandermonde: Complex[][];

  constructor(windowSize: number, tol?: number) {
    this.windowSize = windowSize;
    this.vandermonde = [];
    this.tol = tol ?? 1e-3;
  }

  forward(signal: RealSignal, samplingRate: number = 1) {
    const length = signal.length;
    console.log("length", length);
    if (length !== this.windowSize) {
      throw new Error("Signal length should match the window size");
    } else {
      const freqSignal: FourierDataPoint[] = [];

      for (let k = 0; k < length; k++) {
        let phasor = complex(0, 0);
        for (let n = 0; n < length; n++) {
          const basisVector = this.__calculateBasisVector(n, k);
          phasor = add(phasor, multiply(signal[n] / length, basisVector) as Complex);
        }
        if (Math.abs(phasor.re) < this.tol) {
          phasor.re = 0;
        }

        if (Math.abs(phasor.im) < this.tol) {
          phasor.im = 0;
        }
        const { re, im } = phasor;
        const { r, phi } = phasor.toPolar();
        freqSignal.push({ re, im, r, phi, w: (samplingRate / length) * k });
      }
      return freqSignal;
    }
  }

  reverse(fourier: Complex[]) {
    const length = fourier.length;
    if (length !== this.windowSize) {
      throw new Error("Signal length should match the window size");
    } else {
      const signal: Complex[] = [];

      for (let k = 0; k < this.windowSize; k++) {
        let value = complex(0, 0);
        for (let n = 0; n < this.windowSize; n++) {
          value = add(value, multiply(fourier[n], conj(this.vandermonde[n][k])) as Complex);
        }
        if (Math.abs(value.re) < this.tol) {
          value.re = 0;
        }

        if (Math.abs(value.im) < this.tol) {
          value.im = 0;
        }

        signal.push(multiply(value, 1 / this.windowSize) as Complex);
      }

      return signal;
    }
  }

  private __calculateBasisVector(n: number, k: number) {
    let re = Math.cos((2 * pi * k * n) / this.windowSize);
    let im = Math.sin((2 * pi * k * n) / this.windowSize);

    if (Math.abs(re) < this.tol) {
      re = 0;
    }

    if (Math.abs(im) < this.tol) {
      im = 0;
    }

    return complex(re, im);
  }
}
