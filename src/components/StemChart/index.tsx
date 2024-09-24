import { useEffect, useRef, useState } from "react";
import { Dataset, FourierSignal, RealSignal, StemChartProps } from "../../commons/types";
import * as d3 from "d3";
import { buildRealStemChart, buildMagnitudeStemChart } from "../../utils/chart";

function StemChart({ data, type, parentRef }: StemChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const boundingRect = parentRef.current?.getBoundingClientRect();
    const width = boundingRect?.width ?? 0;
    const height = boundingRect?.height ?? 0;

    console.log("component", type, { width, height: height * 0.667 });

    setDimensions({ width, height });
  }, [parentRef, type]);

  const buildSVG = () => {
    switch (type) {
      case "time":
        buildRealStemChart(data as RealSignal, svgRef, dimensions.width, dimensions.height);
        break;
      case "magnitude":
      case "phase":
        buildMagnitudeStemChart(data as FourierSignal, svgRef, dimensions.width, dimensions.height);
        break;
    }
  };

  useEffect(buildSVG, [data, type]);

  return <svg ref={svgRef}></svg>;
}

export default StemChart;
