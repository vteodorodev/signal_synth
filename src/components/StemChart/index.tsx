import { useEffect, useRef } from "react";
import { Dataset, FourierSignal, RealSignal, StemChartProps } from "../../commons/types";
import * as d3 from "d3";
import {
  appendAxes,
  buildCanvas,
  clearCanvas,
  makeLinearScale,
  appendStems,
  appendLines,
  appendAxesLabels,
  getAxesDomain,
} from "../../utils/chart";

const layoutHeight = 300;
const layoutWidth = 960;

const margin = { top: 10, right: 10, bottom: 50, left: 40 },
  width = layoutWidth - margin.left - margin.right,
  height = layoutHeight - margin.top - margin.bottom;

function buildRealStemChart(data: RealSignal, svgRef: any) {
  const { xDomain, yDomain } = getAxesDomain(data, "time");

  const { xScale, yScale, xAxis, yAxis } = makeLinearScale(xDomain, yDomain, width, height);

  clearCanvas("time-chart");

  const svg = buildCanvas(
    svgRef,
    { width: layoutWidth, height: layoutHeight },
    margin,
    "time-chart"
  );

  appendAxes(svg, "time-x-axis", "time-y-axis", xAxis, yAxis, yScale(0), xScale(0));

  appendStems(svg, data, xScale, yScale, "time");

  appendLines(svg, data, xScale, yScale, "time");
}

function buildMagnitudeStemChart(data: FourierSignal, svgRef: any) {
  const { xDomain, yDomain } = getAxesDomain(data, "frequency");

  const { xScale, yScale, xAxis, yAxis } = makeLinearScale(xDomain, yDomain, width, height);

  clearCanvas("magnitude-chart");

  const svg = buildCanvas(
    svgRef,
    { width: layoutWidth, height: layoutHeight },
    margin,
    "magnitude-chart"
  );

  appendStems(svg, data, xScale, yScale, "frequency");

  appendAxesLabels(svg, width, height, "Frequency (Hz)");

  appendLines(svg, data, xScale, yScale, "frequency");

  appendAxes(svg, "magnitude-x-axis", "magnitude-y-axis", xAxis, yAxis, yScale(0), xScale(0));
}

function StemChart({ data, type }: StemChartProps) {
  const svgRef = useRef(null);

  const buildSVG = () => {
    switch (type) {
      case "time":
        buildRealStemChart(data as RealSignal, svgRef);
        break;
      case "magnitude":
      case "phase":
        buildMagnitudeStemChart(data as FourierSignal, svgRef);
        break;
    }
  };

  useEffect(buildSVG, [data, type]);

  return (
    <div className="d-flex ps-2">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default StemChart;
