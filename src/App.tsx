import React from "react";

import GlobalStyle from "./styles/global";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

import ToastContainer from "./components/ToastContainer";
import AppProvider from "./hooks";

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
