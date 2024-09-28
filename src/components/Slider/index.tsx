import React, { ChangeEvent } from "react";
import ChevronLeft from "../../assets/chevron_left.svg";
import ChevronRight from "../../assets/chevron_right.svg";

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
  //TODO: Add mousedown events

  return (
    <div className="slider" id={id}>
      <img src={ChevronLeft} alt="" role="button" />
      <input
        type="range"
        className=""
        value={Number(value)}
        min={min}
        max={max}
        step={step}
        onChange={onChangeValue}
      />
      <img src={ChevronRight} alt="" role="button" />
      <input type="number" value={Number(value)} onChange={onChangeValue}></input>
    </div>
  );
}

export default Slider;
