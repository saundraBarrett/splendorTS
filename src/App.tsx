import React from "react";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";

import "./App.css";
import { ThemeChoices } from "./types/themes";
import { ThemeContext } from "./contexts/ThemeContext";
import GameSetupPage from "./pages/game-setup";
import GamePage from './pages/game';
import NewGamePage from "./pages/new-game";

function App() {
  const [theme, setTheme] = React.useState(ThemeChoices.Original);
  console.log(process.env.PUBLIC_URL)
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/game/:id/play">
            <GamePage />
          </Route>
          <Route path="/game/:id">
            <GameSetupPage />
          </Route>
          <Route path="/">
            <NewGamePage />
          </Route>
        </Switch>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
