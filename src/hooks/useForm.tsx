import { ChangeEvent, useCallback, useState } from "react";
import { Waveform } from "../commons/types";

interface BasicSliderInfo {
  initialValue: number;
  min: number;
  max: number;
  step: number;
}

interface BasicRadioInfo {
  initialValue: Waveform;
}

export interface BasicFormInfo {
  waveform: BasicRadioInfo;
  frequency: BasicSliderInfo;
  amplitude: BasicSliderInfo;
  phase: BasicSliderInfo;
  length: BasicSliderInfo;
  samplingRate: BasicSliderInfo;
}

interface FormValues {
  waveform: Waveform;
  frequency: number;
  amplitude: number;
  phase: number;
  length: number;
  samplingRate: number;
}

export interface FormHandler {
  waveform: { value: Waveform; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
  frequency: { value: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
  amplitude: { value: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
  phase: { value: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
  length: { value: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
  samplingRate: { value: number; onChange: (e: ChangeEvent<HTMLInputElement>) => void };
}

function initializeForm(basicFormInfo: BasicFormInfo): FormValues {
  return {
    waveform: basicFormInfo.waveform.initialValue,
    frequency: basicFormInfo.frequency.initialValue,
    amplitude: basicFormInfo.amplitude.initialValue,
    phase: basicFormInfo.phase.initialValue,
    length: basicFormInfo.length.initialValue,
    samplingRate: basicFormInfo.samplingRate.initialValue,
  };
}

function useForm(basicFormInfo: BasicFormInfo): FormHandler {
  const [formData, setFormData] = useState<FormValues>(initializeForm(basicFormInfo));

  const onChangeWaveform = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, waveform: e.target.value as Waveform }));
  }, []);

  const onChangeFrequency = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetFrequency = Number(e.target.value);
      const maxFrequency = basicFormInfo.frequency.max;
      const minFrequency = basicFormInfo.frequency.min;
      let newFrequency: number;

      if (targetFrequency > maxFrequency) {
        newFrequency = maxFrequency;
      } else if (targetFrequency < minFrequency) {
        newFrequency = minFrequency;
      } else {
        newFrequency = targetFrequency;
      }

      setFormData((prev) => ({ ...prev, frequency: newFrequency }));
    },
    [basicFormInfo.frequency.max, basicFormInfo.frequency.min]
  );

  const onChangeAmplitude = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetAmplitude = Number(e.target.value);
      const maxAmplitude = basicFormInfo.amplitude.max;
      const minAmplitude = basicFormInfo.amplitude.min;

      let newAmplitude: Number | null;

      if (targetAmplitude > maxAmplitude) {
        newAmplitude = maxAmplitude;
      } else if (targetAmplitude < minAmplitude) {
        newAmplitude = null;
      } else {
        newAmplitude = targetAmplitude;
      }

      setFormData((prev) => ({ ...prev, amplitude: Number(newAmplitude) }));
    },
    [basicFormInfo.amplitude.max, basicFormInfo.amplitude.min]
  );

  const onChangePhase = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetPhase = Number(e.target.value);
      const maxPhase = basicFormInfo.phase.max;
      const minPhase = basicFormInfo.phase.min;

      let newPhase: Number | null;

      if (targetPhase > maxPhase) {
        newPhase = maxPhase;
      } else if (targetPhase < minPhase) {
        newPhase = null;
      } else {
        newPhase = targetPhase;
      }

      setFormData((prev) => ({ ...prev, phase: Number(newPhase) }));
    },
    [basicFormInfo.phase.max, basicFormInfo.phase.min]
  );

  const onChangeSamplingRate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetSamplingFrequency = Number(e.target.value);
      const maxSamplingRate = basicFormInfo.samplingRate.max;
      const minSamplingRate = basicFormInfo.samplingRate.min;

      let newSamplingFrequency: Number | null;

      if (targetSamplingFrequency > maxSamplingRate) {
        newSamplingFrequency = maxSamplingRate;
      } else if (targetSamplingFrequency < minSamplingRate) {
        newSamplingFrequency = minSamplingRate;
      } else {
        newSamplingFrequency = targetSamplingFrequency;
      }

      setFormData((prev) => ({ ...prev, samplingRate: Number(newSamplingFrequency) }));
    },
    [basicFormInfo.samplingRate.max, basicFormInfo.samplingRate.min]
  );

  const onChangeLength = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetLength = Number(e.target.value);
      const maxLength = basicFormInfo.length.max;
      const minLength = basicFormInfo.length.min;

      let newLength: Number | null;

      if (targetLength > maxLength) {
        newLength = maxLength;
      } else if (targetLength < minLength) {
        newLength = minLength;
      } else {
        newLength = targetLength;
      }

      setFormData((prev) => ({ ...prev, length: Number(newLength) }));
    },
    [basicFormInfo.length.max, basicFormInfo.length.min]
  );

  return {
    waveform: { value: formData.waveform, onChange: onChangeWaveform },
    frequency: { value: formData.frequency, onChange: onChangeFrequency },
    amplitude: { value: formData.amplitude, onChange: onChangeAmplitude },
    phase: { value: formData.phase, onChange: onChangePhase },
    length: { value: formData.length, onChange: onChangeLength },
    samplingRate: { value: formData.samplingRate, onChange: onChangeSamplingRate },
  };
}

export default useForm;
