import { createContext, useContext, useEffect, useState } from "react";
import {
  Dataset,
  FourierDataPoint,
  FourierSignal,
  NumberOrComplex,
  RealSignal,
  SignalContextType,
} from "../commons/types";

export const SignalContext = createContext<SignalContextType | null>(null);

const SignalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [signal, setSignal] = useState<RealSignal>([]);
  const [fourier, setFourier] = useState<FourierSignal>([]);

  return (
    <SignalContext.Provider value={{ signal, setSignal, fourier, setFourier }}>
      {children}
    </SignalContext.Provider>
  );
};

export default SignalContextProvider;
