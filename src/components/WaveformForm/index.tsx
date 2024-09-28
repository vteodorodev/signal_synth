import { useContext, useEffect, useMemo, useRef } from "react";
import "./styles.css";
import Slider from "../Slider";
import { SignalContextType, Waveform } from "../../commons/types";

import { Wave } from "../../utils/wave";
import { SignalContext } from "../../contexts/SignalContext";
import useForm, { BasicFormInfo, FormHandler } from "../../hooks/useForm";

const waveOptions: { label: string; form: Waveform }[] = [
  { label: "Sine", form: "sine" },
  { label: "Square", form: "square" },
  { label: "Triangular", form: "triangular" },
  { label: "Sawtooth", form: "sawtooth" },
];

const initialFormValues: BasicFormInfo = {
  waveform: {
    initialValue: "sine",
  },
  frequency: {
    initialValue: 4,
    min: 0,
    max: 1000,
    step: 1,
  },
  amplitude: {
    initialValue: 3,
    min: 0,
    max: 20,
    step: 1,
  },
  phase: {
    initialValue: 0,
    min: 0,
    max: 369,
    step: 1,
  },
  length: {
    initialValue: 8,
    min: 1,
    max: 512,
    step: 1,
  },
  samplingRate: {
    initialValue: 16,
    min: 1,
    max: 2000,
    step: 1,
  },
};

function WaveformForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const { setSignal, setFourier } = useContext(SignalContext) as SignalContextType;

  const { waveform, frequency, amplitude, phase, length, samplingRate }: FormHandler =
    useForm(initialFormValues);

  const wave = useMemo(
    () =>
      new Wave(
        waveform.value,
        frequency.value,
        amplitude.value,
        phase.value,
        samplingRate.value,
        length.value
      ),
    [
      amplitude.value,
      frequency.value,
      length.value,
      phase.value,
      samplingRate.value,
      waveform.value,
    ]
  );

  useEffect(() => {
    setSignal([...wave.signal]);
    const fourier = wave.computeFourier();
    setFourier(fourier);
  }, [wave, setSignal, setFourier]);

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
                    checked={wave.form === waveform.value}
                    name="wave"
                    className="me-1"
                    onChange={waveform.onChange}
                  />
                  <label htmlFor={wave.form}>{wave.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Frequency (Hz)</span>
            <Slider
              value={frequency.value}
              min={initialFormValues.frequency.min}
              max={initialFormValues.frequency.max}
              step={1}
              onChangeValue={frequency.onChange}
              id="frequency-slider"
            />
          </div>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Amplitude</span>
            <Slider
              value={amplitude.value}
              min={initialFormValues.amplitude.min}
              max={initialFormValues.amplitude.max}
              step={1}
              onChangeValue={amplitude.onChange}
              id="amplitude-slider"
            />
          </div>
          {/*           <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Phase</span>
            <Slider
              value={formData.phase}
              min={minPhase}
              max={maxPhase}
              step={1}
              onChangeValue={onChangePhase}
              id="phase-slider"
            />
          </div> */}
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Sampling Frequency</span>
            <Slider
              value={samplingRate.value}
              min={initialFormValues.samplingRate.min}
              max={initialFormValues.samplingRate.max}
              step={1}
              onChangeValue={samplingRate.onChange}
              id="sampling-frequency-slider"
            />
          </div>
          <div className="form-section d-flex flex-column align-items-start">
            <span className="label-text">Length</span>
            <Slider
              value={length.value}
              min={initialFormValues.length.min}
              max={initialFormValues.length.max}
              step={1}
              onChangeValue={length.onChange}
              id="length-slider"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default WaveformForm;
