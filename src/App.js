import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import Main from "./components/Main";
import Research from './components/Research';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Main />
        <Routes>
          <Route path="/" component={Main} />
          <Route path="/" component={Research} />
        </Routes> 
      </Router>
    </ChakraProvider>
  );
}

export default App;
