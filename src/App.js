import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Details from './pages/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/details/:id">
            <Details/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
