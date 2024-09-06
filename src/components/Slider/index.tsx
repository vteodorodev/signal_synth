import React, { ChangeEvent } from "react";
import "./styles.css";

function Slider({
  value,
  min,
  max,
  step = 1,
  id,
  onChangeValue,
}: {
  value: number | null;
  min: number;
  max: number;
  step: number;
  id?: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="slider d-flex align-items-center" id={id}>
      <input
        type="range"
        className="me-1"
        value={Number(value)}
        min={min}
        max={max}
        step={step}
        onChange={onChangeValue}
      />
      <span>{String(value)}</span>
    </div>
  );
}

export default Slider;
