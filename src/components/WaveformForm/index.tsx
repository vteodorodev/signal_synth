import { ChangeEvent, FormEvent, LegacyRef, useEffect, useRef, useState } from "react";
import "./index.css";

enum Wave {
  sinusoidal = "sinusoidal",
  sawtooth = "sawtooth",
  triangular = "triangular",
  square = "square",
}

type waveformFormData = {
  waveform: Wave | null;
  frequency: Number | null;
  amplitude: Number | null;
  phase: Number | null;
};

const waveforms: Wave[] = [Wave.sinusoidal, Wave.square, Wave.triangular, Wave.sawtooth];

const minFrequency = 0;
const maxFrequency = 1000;

const minAmplitude = 0;
const maxAmplitude = 10;

const minPhase = 0;
const maxPhase = 259;

const initialFormValues: waveformFormData = {
  waveform: Wave.square,
  frequency: 5,
  amplitude: 10,
  phase: 0,
};

function WaveformForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<waveformFormData>(initialFormValues);

  const onChangeWaveform = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, waveform: e.target.value as Wave }));
  };

  const onChangeFrequency = (e: ChangeEvent<HTMLInputElement>) => {
    const targetFrequency = Number(e.target.value);
    let newFrequency: Number | null;

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

  return (
    <div className="d-flex flex-column align-items-start px-3 py-2">
      <h3 className="category-text">Sample Waveforms</h3>
      <div className="d-flex flex-column">
        <form id="sample-waveform" action="" className="mt-2" ref={formRef}>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Waveform</span>
            <div className="d-flex flex-row flex-wrap">
              {waveforms.map((waveform) => (
                <div className="d-flex flex-row radio-choice me-2" key={waveform}>
                  <input
                    type="radio"
                    id={waveform}
                    value={waveform}
                    name="waveform"
                    className="me-1"
                    onChange={onChangeWaveform}
                  />
                  <label htmlFor={waveform}>{waveform}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Frequency</span>
            <span>
              <input
                type="number"
                max={maxFrequency}
                step={5}
                className="me-1"
                onChange={onChangeFrequency}
                value={Number(formData.frequency)}
              ></input>
              <span>Hz</span>
            </span>
          </div>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Amplitude</span>
            <span>
              <input
                type="number"
                className="me-1"
                onChange={onChangeAmplitude}
                value={Number(formData.amplitude)}
              ></input>
              <span>V</span>
            </span>
          </div>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Phase</span>
            <span>
              <input type="number" max={359} className="me-1" onChange={onChangePhase}></input>
              <span>deg</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WaveformForm;
