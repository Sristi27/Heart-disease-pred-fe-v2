import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar'
import {Route,BrowserRouter} from 'react-router-dom'
import Home from './components/Home'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/checkup"><LandingPage/></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
