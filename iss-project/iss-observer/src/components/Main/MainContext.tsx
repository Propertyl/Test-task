import { createContext, useContext, useState } from 'react';
import type { setDispatch } from '../../types/global';

type ContextProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  crewIsEarned:boolean,
  setCrewIsEarned:setDispatch<boolean>,
  locationIsEarned:boolean,
  setLocationIsEarned:setDispatch<boolean>
};

const MainContext = createContext<ContextType | null>(null);

export const MainContextProvider = ({ children }: ContextProviderProps) => {
  const [crewIsEarned, setCrewIsEarned] = useState(false);
  const [locationIsEarned, setLocationIsEarned] = useState(false);

  return (
    <MainContext.Provider
      value={{
        crewIsEarned,setCrewIsEarned,locationIsEarned,setLocationIsEarned
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const getMainContext = () => {
  const ctx = useContext(MainContext);

  if(ctx) {
    return ctx;
  } else {
    return {} as ContextType;
  }

}