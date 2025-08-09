import { lazy, Suspense } from 'react';
import ErrorBoundary from '../../functions/ErrorBoundary';
import MainLoading from '../Loadings/MainLoading';
import './Main.css';
import { getMainContext } from './MainContext';
import ComponentLoading from '../Loadings/ComponentLoading';

const CrewLazy = lazy(() => import('../Crew/Crew'));
const ISSLocationLazy = lazy(() => import('../MapLocation/ISS-Location'));

const Main = () => {
  const {crewIsEarned,locationIsEarned} = getMainContext();

  return (
      <div className='main-section main-block centered-elements'>
        <div className="info-section main-block">
          <ErrorBoundary fallback={<h1>Something went wrong,please check your internet connection and update page</h1>}>
          <div className='crew-section main-block'>
            <Suspense fallback={<ComponentLoading/>}>
              <CrewLazy/>
            </Suspense>
          </div>
          <div className='location-section main-block'>
            <Suspense fallback={<ComponentLoading/>}>
              <ISSLocationLazy/>
            </Suspense>
          </div>
          {(!crewIsEarned && !locationIsEarned) && <MainLoading/>}
        </ErrorBoundary>
        </div>
      </div>      
  )
}
 
export default Main;