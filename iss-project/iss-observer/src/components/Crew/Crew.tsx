import { useEffect, useRef, useState } from "react";
import getCrew from "../../functions/getISSInfo";
import type { Crew } from "../../types/global";
import { getMainContext } from "../Main/MainContext";
import ComponentLoading from "../Loadings/ComponentLoading";
import './Crew.css';

let interval:number | null = null;

const ISSCraftFilter = ({craft}:Crew['people'][0]) => {
  if(craft === 'ISS') {
    return true;
  }

  return false;
}

const Crew = () => {
  const {crewIsEarned,setCrewIsEarned} = getMainContext();
  const [issCrew, setIssCrew] = useState<Crew | null>(null);
  const handleCrewUpdate = useRef(getCrew<Crew | null>(setIssCrew,'http://api.open-notify.org/astros.json'));

  useEffect(() => {
    const getISSCrew = handleCrewUpdate.current();

    interval = setInterval(() => {
      getISSCrew();
    },5000);

    return () => {
      if(interval) {
        clearInterval(interval);
      }
    }
  },[]);

  useEffect(() => {
    if(issCrew && !crewIsEarned) {
      setCrewIsEarned(true);
    }
  },[issCrew,crewIsEarned]);

  return (
    <div className="container crew-info-section centered-elements">
      {issCrew ?
       <>
         <div className="crew-info container">
           {
            issCrew.people.filter(ISSCraftFilter).map(({name}) => (
                <div className="crew-member container" key={`ISS-person-${name}`}>
                    <svg className="crew-member-icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M481.516,195.765c-21.46-80.271-84.734-143.622-164.959-165.194C302.844,12.031,280.832,0,256,0 s-46.843,12.031-60.556,30.571c-80.226,21.572-143.5,84.923-164.96,165.194H0v120.471h30.484 c6.409,23.974,16.545,46.437,29.752,66.732V512h391.529V382.967c13.207-20.295,23.343-42.758,29.752-66.732H512V195.765H481.516z M256,67.765c37.575,0,72.609,11.073,102.024,30.118H153.977C183.391,78.837,218.425,67.765,256,67.765z M105.412,466.824v-32.64 c15.276,12.93,32.223,23.938,50.476,32.64H105.412z M153.977,414.118h204.047c-29.414,19.045-64.449,30.118-102.024,30.118 S183.391,433.163,153.977,414.118z M406.588,466.824h-50.476c18.253-8.703,35.202-19.711,50.476-32.64V466.824z M406.493,368.941 H105.507C81.821,337.459,67.765,298.341,67.765,256s14.056-81.459,37.742-112.941h300.985 c23.688,31.482,37.743,70.6,37.743,112.941S430.179,337.459,406.493,368.941z"></path> </g> </g> <g> <g> <path d="M175.062,201.014l-37.251-25.559c-16.27,23.715-24.87,51.568-24.87,80.545c0,28.982,8.6,56.833,24.871,80.545 l37.25-25.562c-11.085-16.152-16.944-35.165-16.944-54.983C158.118,236.186,163.977,217.172,175.062,201.014z"></path> </g> </g> </g></svg> {name}
                </div>
              )) 
           }
         </div>
         <div className="crew-count container centered-elements">
          People on ISS: {
            issCrew.people.filter(ISSCraftFilter).length
          }
         </div>
       </>
        : <ComponentLoading/>
      }
    </div>
  )
}
 
export default Crew;