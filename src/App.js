import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'
import LandingPage from './components/LandingPage';


function App() {

  // useEffect(() => {
  //   fetch("http://localhost:5000/",
  //   {
  //     method:'GET',
  //     headers: {
  //       'Access-Control-Allow-Origin':'*'
  //     }
  //   })
  //   .then(res=>res.json())
  //   .then(res=>console.log(res))
  // }, [])
  return (
    <div className="App">
     <LandingPage/>
    </div>
  );
}

export default App;
