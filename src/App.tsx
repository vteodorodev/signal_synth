import { useContext, useEffect } from "react";
import "./App.css";
import StemChart from "./components/StemChart";
import WaveformForm from "./components/WaveformForm";
import SignalContextProvider, { SignalContext } from "./contexts/SignalContext";
import { SignalContextType } from "./commons/types";

function App() {
  const signal = useContext(SignalContext)?.signal;
  const fourier = useContext(SignalContext)?.fourier;

  return (
    <div className="App bg-dark-blue">
      <div className="header">
        <h1 className="text-white fw-bold">Signal Synthesizer</h1>
      </div>
      <div className="page-contents">
        <div className="row g-5">
          <div className="col-sm-12 col-md-4">
            <div className="bg-white countainer-rounded">
              <WaveformForm />
            </div>
          </div>
          <div className="col-sm-12 col-md-8">
            <div className="bg-white countainer-rounded">
              {/* <StemChart data={signal ?? []} /> */}
              <StemChart data={fourier ?? []} type="magnitude" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
