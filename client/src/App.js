import FunctionalGameContainer from "./components/GameContainer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Link to="/match">Games Home</Link>
      <Switch>
        <Route path="/match">
          <FunctionalGameContainer />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export { App };
