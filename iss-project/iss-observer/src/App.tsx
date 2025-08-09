import './App.css'
import Main from './components/Main/Main'
import { MainContextProvider } from './components/Main/MainContext'

function App() {
 
  return (
    <>
      <MainContextProvider>
        <Main/>
      </MainContextProvider>
    </>
  )
}

export default App
