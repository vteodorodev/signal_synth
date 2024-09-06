import { ChangeEvent, FormEvent, LegacyRef, useEffect, useRef, useState } from "react";
import "./styles.css";
import Slider from "../Slider";

type Wave = "sine" | "square" | "triangular" | "sawtooth";

const waveOptions: { label: string; form: Wave }[] = [
  { label: "Sine", form: "sine" },
  { label: "Square", form: "square" },
  { label: "Triangular", form: "triangular" },
  { label: "Sawtooth", form: "sawtooth" },
];

type FormData = {
  waveform: Wave | null;
  frequency: number | null;
  amplitude: number | null;
  phase: number | null;
};

const minFrequency = 0;
const maxFrequency = 1000;

const minAmplitude = 0;
const maxAmplitude = 10;

const minPhase = 0;
const maxPhase = 359;

const initialFormValues: FormData = {
  waveform: "square",
  frequency: 20,
  amplitude: 10,
  phase: 0,
};

function WaveformForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>(initialFormValues);

  const onChangeWaveform = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, waveform: e.target.value as Wave }));
  };

  const onChangeFrequency = (e: ChangeEvent<HTMLInputElement>) => {
    const targetFrequency = Number(e.target.value);
    let newFrequency: number | null;

    if (targetFrequency > maxFrequency) {
      newFrequency = maxFrequency;
    } else if (targetFrequency < minFrequency) {
      newFrequency = null;
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
                    value={wave.label}
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
              step={5}
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
        </form>
      </div>
    </div>
  );
}

export default WaveformForm;
