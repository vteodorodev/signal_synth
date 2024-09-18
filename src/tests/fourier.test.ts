import { Signal } from "../commons/types";
import { Fourier } from "../utils/fourier";

test("calculates dft of dc signal correctly", () => {
  const length = 4;
  const tol = 1e-3;
  const signal: Signal = { value: Array(length).fill(1), samplingRate: 1 };
  const fft = new Fourier(signal.value.length);

  const fourier = fft.forward(signal);

  expect(fourier[0].re).toBeCloseTo(length, tol);
  expect(fourier[0].im).toBeCloseTo(0, tol);

  for (let i = 1; i < length; i++) {
    expect(fourier[i].re).toBeCloseTo(0, tol);
    expect(fourier[i].im).toBeCloseTo(0, tol);
  }
});

test("calculates idft correctly", () => {
  const length = 4;
  const tol = 1e-3;
  const signal: Signal = { value: Array(length).fill(1), samplingRate: 1 };
  const fft = new Fourier(signal.value.length);

  const fourier = fft.forward(signal);

  const reconstructedSignal = fft.reverse(fourier).map((val) => val.toPolar().r);

  for (let i = 0; i < length; i++) {
    expect(signal.value[0]).toBeCloseTo(reconstructedSignal[0], tol);
  }
});

test("raises error when windows mismatch", () => {
  const size1 = 10;
  const size2 = 20;
  const samplingRate = 1;

  const dft = new Fourier(size1);
  const signal: Signal = { value: Array(size2).fill(0), samplingRate };

  const t = () => dft.forward(signal);

  expect(t).toThrow("Signal length should match the window size");
});
