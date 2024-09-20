import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import Slider from "../Slider";
import { Waveform } from "../../commons/types";

import { Wave } from "../../utils/wave";

const waveOptions: { label: string; form: Waveform }[] = [
  { label: "Sine", form: "sine" },
  { label: "Square", form: "square" },
  { label: "Triangular", form: "triangular" },
  { label: "Sawtooth", form: "sawtooth" },
];

type FormData = {
  waveform: Waveform;
  frequency: number;
  amplitude: number;
  phase: number;
  duration: number;
  harmonics: number;
  samplingFrequency: number;
};

const minFrequency = 0;
const maxFrequency = 10;

const minAmplitude = 0;
const maxAmplitude = 10;

const minPhase = 0;
const maxPhase = 359;

const minLength = 1;
const maxLength = 50;

const initialFormValues: FormData = {
  waveform: "sine",
  frequency: 4,
  amplitude: 10,
  phase: 0,
  duration: 2,
  harmonics: 50,
  samplingFrequency: 7,
};

function WaveformForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>(initialFormValues);

  const wave = useMemo(
    () =>
      new Wave(
        formData.waveform,
        formData.frequency,
        formData.amplitude,
        formData.phase,
        formData.samplingFrequency,
        formData.harmonics
      ),
    [
      formData.waveform,
      formData.frequency,
      formData.amplitude,
      formData.phase,
      formData.samplingFrequency,
      formData.harmonics,
    ]
  );

  const onChangeWaveform = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, waveform: e.target.value as Waveform }));
  };

  const onChangeFrequency = (e: ChangeEvent<HTMLInputElement>) => {
    const targetFrequency = Number(e.target.value);
    let newFrequency: number;

    if (targetFrequency > maxFrequency) {
      newFrequency = maxFrequency;
    } else if (targetFrequency < minFrequency) {
      newFrequency = minFrequency;
    } else {
      newFrequency = targetFrequency;
    }

    setFormData((prev) => ({ ...prev, frequency: newFrequency }));
  };

  const onChangeAmplitude = (e: ChangeEvent<HTMLInputElement>) => {
    const targetAmplitude = Number(e.target.value);
    let newAmplitude: Number | null;

    if (targetAmplitude > maxAmplitude) {
      newAmplitude = maxAmplitude;
    } else if (targetAmplitude < minAmplitude) {
      newAmplitude = null;
    } else {
      newAmplitude = targetAmplitude;
    }

    setFormData((prev) => ({ ...prev, amplitude: Number(newAmplitude) }));
  };

  const onChangePhase = (e: ChangeEvent<HTMLInputElement>) => {
    const targetPhase = Number(e.target.value);
    let newPhase: Number | null;

    if (targetPhase > maxPhase) {
      newPhase = maxPhase;
    } else if (targetPhase < minPhase) {
      newPhase = null;
    } else {
      newPhase = targetPhase;
    }

    setFormData((prev) => ({ ...prev, phase: Number(newPhase) }));
  };

  const onChangeHarmonics = (e: ChangeEvent<HTMLInputElement>) => {
    const targetLength = Number(e.target.value);
    let newLength: Number | null;

    if (targetLength > maxLength) {
      newLength = maxLength;
    } else if (targetLength < minLength) {
      newLength = minLength;
    } else {
      newLength = targetLength;
    }

    setFormData((prev) => ({ ...prev, harmonics: Number(newLength) }));
  };

  useEffect(() => {
    console.log(wave.computeFourier());
  }, [wave]);

  return (
    <div className="d-flex flex-column align-items-start px-3 py-2">
      <h3 className="category-text">Sample Waveforms</h3>
      <div className="d-flex flex-column">
        <form id="sample-waveform" action="" className="mt-2" ref={formRef}>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Waveform</span>
            <div className="d-flex flex-row flex-wrap">
              {waveOptions.map((wave) => (
                <div className="d-flex align-items-center me-2" key={wave.label}>
                  <input
                    type="radio"
                    id={wave.form}
                    value={wave.form}
                    checked={wave.form === formData.waveform}
                    name="wave"
                    className="me-1"
                    onChange={onChangeWaveform}
                  />
                  <label htmlFor={wave.form}>{wave.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Frequency (Hz)</span>
            <Slider
              value={formData.frequency}
              min={minFrequency}
              max={maxFrequency}
              step={1}
              onChangeValue={onChangeFrequency}
              id="frequency-slider"
            />
          </div>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Amplitude</span>
            <Slider
              value={formData.amplitude}
              min={minAmplitude}
              max={maxAmplitude}
              step={1}
              onChangeValue={onChangeAmplitude}
              id="amplitude-slider"
            />
          </div>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Phase</span>
            <Slider
              value={formData.phase}
              min={minPhase}
              max={maxPhase}
              step={1}
              onChangeValue={onChangePhase}
              id="phase-slider"
            />
          </div>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Harmonics</span>
            <Slider
              value={formData.harmonics}
              min={minLength}
              max={maxLength}
              step={1}
              onChangeValue={onChangeHarmonics}
              id="length-slider"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default WaveformForm;
