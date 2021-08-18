import { Switch, Route } from "react-router-dom";
import "./App.css";
//Pages
import HomePage from "./pages/homePage";
import Login from "./pages/login";
import Register from "./pages/register";
import Treatment from "./pages/treatment";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsAndConditions from "./pages/termsAndConditions";
import Error500 from "./pages/errors/500";
import Error404 from "./pages/errors/404";
import Layoutv1 from "./layouts/layoutv1";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Layoutv1>
              <HomePage />
            </Layoutv1>
          )}
        />
        <Route exact path="/login" render={() => <Login />} />
        <Route
          exact
          path="/register"
          render={() => (
            <Layoutv1>
              <Register />
            </Layoutv1>
          )}
        />
        <Route
          exact
          path="/treatment"
          render={() => (
            <Layoutv1>
              <Treatment />
            </Layoutv1>
          )}
        />
        {/* Info */}
        <Route exact path="/privacy-Policy" render={() => <PrivacyPolicy />} />
        <Route
          exact
          path="/terms-and-conditions"
          render={() => <TermsAndConditions />}
        />
        {/* Errors */}
        <Route exact path="/page500" render={() => <Error500 />} />
        <Route exact path="*" render={() => <Error404 />} />
      </Switch>
    </div>
  );
}

export default App;
