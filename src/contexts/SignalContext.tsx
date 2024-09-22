import { createContext, useContext, useEffect, useState } from "react";
import { Dataset, NumberOrComplex, SignalContextType } from "../commons/types";

export const SignalContext = createContext<SignalContextType | null>(null);

const SignalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [signal, setSignal] = useState<Dataset>([]);
  const [fourier, setFourier] = useState<Dataset>([]);

  return (
    <SignalContext.Provider value={{ signal, setSignal, fourier, setFourier }}>
      {children}
    </SignalContext.Provider>
  );
};

export default SignalContextProvider;
