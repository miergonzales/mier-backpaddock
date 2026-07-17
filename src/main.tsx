import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { store } from "./store";
import router from "./app/router";
import rootTheme from "./themes/rootThemes";

import { ErrorBoundary } from "./components/errors/ErrorBoundary";

import "./index.css";
import { saveReport } from "./lib/storage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
store.subscribe(() => {
  saveReport(store.getState().countries.report);
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={rootTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
);
