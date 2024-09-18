import { Signal } from "../commons/types";
import { Complex, pi, add, multiply, complex, conj } from "mathjs";

export class Fourier {
  windowSize: number;
  tol: number;
  private vandermonde: Complex[][];

  constructor(windowSize: number, tol?: number) {
    this.windowSize = windowSize;
    this.vandermonde = [];
    this.tol = tol ?? 1e-3;

    for (let n = 0; n < windowSize; n++) {
      const paddedRow = new Array(windowSize).fill(complex(0, 0));
      this.vandermonde.push(paddedRow);
    }

    for (let k = 0; k < windowSize; k++) {
      for (let n = k; n < windowSize; n++) {
        let re = Math.cos((2 * pi * k * n) / windowSize);

        if (Math.abs(re) < this.tol) {
          re = 0;
        }

        let im = Math.sin((2 * pi * k * n) / windowSize);

        if (Math.abs(im) < this.tol) {
          im = 0;
        }

        const vector = complex(re, im);
        if (k === n) {
          this.vandermonde[n][n] = vector;
        } else {
          this.vandermonde[k][n] = vector;
          this.vandermonde[n][k] = vector;
        }
      }
    }
  }

  forward(signal: Signal) {
    const length = signal.value.length;
    if (length !== this.windowSize) {
      throw new Error("Signal length should match the window size");
    } else {
      const freqSignal: Complex[] = [];

      for (let k = 0; k < this.windowSize; k++) {
        let phasor = complex(0, 0);
        for (let n = 0; n < this.windowSize; n++) {
          phasor = add(phasor, multiply(signal.value[n], this.vandermonde[n][k]) as Complex);
        }
        if (Math.abs(phasor.re) < this.tol) {
          phasor.re = 0;
        }

        if (Math.abs(phasor.im) < this.tol) {
          phasor.im = 0;
        }

        freqSignal.push(phasor);
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
}
