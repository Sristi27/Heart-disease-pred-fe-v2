import './App.css'; 
import Checkup from './components/Checkup';
import Navbar from './components/Navbar'
import {Route,BrowserRouter,Switch} from 'react-router-dom'
import Home from './components/Home'  
import HistoryTable from './components/HistoryList';

// export const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
//   const [loginData,setLoginData] = useState({});
//   useEffect = (()=>{
//     if(localStorage.getItem("loginData")){
//       setLoginData(localStorage.getItem("loginData"));
//     }
//   },[]);
//   return (
//     <Route
//       {...restOfProps}
//       render={(props) =>
//         loginData ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// }


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Switch>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/checkup/:id"><Checkup/></Route>
      <Route exact path="/history/:id"><HistoryTable/></Route>
      <Route path="*"><Home/></Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
