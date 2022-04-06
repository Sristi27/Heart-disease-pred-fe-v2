import './App.css'; 
import Checkup from './components/Checkup';
import Navbar from './components/Navbar'
import {Route,BrowserRouter} from 'react-router-dom'
import Home from './components/Home'  
import HistoryTable from './components/HistoryTable';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      {/* <Auth/> */}
      <Route exact path="/"><Home/></Route>
      <ProtectedRoute exact path="/checkup/:id"><Checkup/></ProtectedRoute>
      <ProtectedRoute exact path="/history/:id"><HistoryTable/></ProtectedRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;
