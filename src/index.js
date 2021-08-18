import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import AppLocale from "./languages";

ReactDOM.render(
  <IntlProvider
    locale={AppLocale["en"].locale}
    messages={AppLocale["en"].messages}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById("root")
);
