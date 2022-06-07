import "./App.css";
import Checkup from "./components/Checkup";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import HistoryTable from "./components/HistoryList";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setLoading={setLoading} setUser={setUser} user={user}/>
        <Switch>
          <Route exact path="/">
            <Home loading={loading} user={user} />
          </Route>
          {user && (
            <>
              <Route exact path="/checkup/:id">
                <Checkup />
              </Route>
              <Route exact path="/history/:id">
                <HistoryTable />
              </Route>
            </>
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
