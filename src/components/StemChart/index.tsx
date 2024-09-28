import { useCallback, useEffect, useRef } from "react";
import { FourierSignal, RealSignal, StemChartProps } from "../../commons/types";
import { buildRealStemChart, buildMagnitudeStemChart } from "../../utils/chart";
import { useContainerDimensions } from "../../hooks/useContainerDimensions";

function StemChart({ data, type, parentRef }: StemChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const dimensions = useContainerDimensions(parentRef);

  const buildSVG = useCallback(() => {
    switch (type) {
      case "time":
        buildRealStemChart(data as RealSignal, svgRef, dimensions.width, dimensions.height);
        break;
      case "magnitude":
      case "phase":
        buildMagnitudeStemChart(data as FourierSignal, svgRef, dimensions.width, dimensions.height);
        break;
    }
  }, [data, dimensions.height, dimensions.width, type]);

  useEffect(buildSVG, [buildSVG]);

  return <svg ref={svgRef}></svg>;
}

export default StemChart;
