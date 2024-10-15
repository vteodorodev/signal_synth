import { useContext, useRef } from "react";
import "./App.css";
import StemChart from "./components/StemChart";
import WaveformForm from "./components/WaveformForm";
import { SignalContext } from "./contexts/SignalContext";

function App() {
  const signal = useContext(SignalContext)?.signal;
  const fourier = useContext(SignalContext)?.fourier;

  const timeChartContainerRef = useRef<HTMLDivElement>(null);
  const frequencyChartContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App bg-dark-blue overflow-x-hidden">
      <div className="header">
        <h1 className="text-white fw-bold my-3">Signal Synthesizer</h1>
      </div>
      <div className="page-content p-3">
        <div className="bg-white countainer-rounded form">
          <WaveformForm />
        </div>
        <div className="charts-container">
          <div
            className="bg-white chart countainer-rounded time-chart-container"
            ref={timeChartContainerRef}
          >
            <StemChart data={signal ?? []} type="time" parentRef={timeChartContainerRef} />
          </div>

          <div
            className="bg-white chart countainer-rounded frequency-chart-container"
            ref={frequencyChartContainerRef}
          >
            <StemChart
              data={fourier ?? []}
              type="magnitude"
              parentRef={frequencyChartContainerRef}
            />
          </div>
        </div>

        {/* <div className="row h-100">
          <div className="col-12 col-md-2">
            <div className="bg-white countainer-rounded">
              <WaveformForm />
            </div>
          </div>
          <div className="col-12 col-md-10">
            <div className="bg-white time-chart-container" ref={timeChartContainerRef}>
              <StemChart data={signal ?? []} type="time" parentRef={timeChartContainerRef} />
            </div>
            <div className="bg-white frequency-chart-container" ref={frequencyChartContainerRef}>
              <StemChart
                data={fourier ?? []}
                type="magnitude"
                parentRef={frequencyChartContainerRef}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
