import { ChakraProvider, Center } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";
import "./App.css";

function App() {
  return (
    <>
      <ChakraProvider>
        <Navbar />
          <Main />
      </ChakraProvider>
    </>
  );
}

export default App;
