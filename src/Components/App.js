import React, { component } from "react";
import Router from "./Router";
import Header from "./Header";
import { render } from "@testing-library/react";
import GlobalStyles from "Components/GlobalStyles";

function App() {
   return (
      <>
         <Router />
         <GlobalStyles />
      </>
   );
}

export default App;
