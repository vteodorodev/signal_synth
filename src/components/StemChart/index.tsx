import { useEffect, useRef } from "react";
import { Dataset, FourierSignal, RealSignal, StemChartProps } from "../../commons/types";
import * as d3 from "d3";
import { buildRealStemChart, buildMagnitudeStemChart } from "../../utils/chart";

function StemChart({ data, type }: StemChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    console.log(svgRef.current?.getBoundingClientRect());
  }, []);

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
