import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";
import Research from './components/Research'; // Assuming Research.js is in the same location as your other components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/research" component={Research} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
