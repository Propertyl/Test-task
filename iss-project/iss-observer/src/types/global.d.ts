import type { Dispatch, SetStateAction } from "react";

type setDispatch<T> = Dispatch<SetStateAction<T>>;

interface ErrorBoundaryProps {
  children:ReactNode;
  fallback:ReactNode;
}

interface ErrorBoundaryStates {
  hasError:boolean;
  error:Error | null;
}

// interface DefaultRes {
//   message:string;
// }

interface LocationOnMap {
  iss_position: {
    latitude:string,
    longitude:string
  }
}

interface issHuman {
  name:string;
  craft:'ISS' | string;
}

interface Crew {
  'number':number,
  people:issHuman[]
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

export {
  setDispatch,
  ErrorBoundaryProps,
  ErrorBoundaryStates,
  LocationOnMap,Crew,issHuman
};