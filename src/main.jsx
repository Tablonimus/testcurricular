import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "./main.css";
import AxiosInterceptor from "./Infra/Services/AxiosInterceptor/interceptor.service";
import { theme } from "./Infra/Services/themeInterceptor/interceptor.service";

AxiosInterceptor();
theme.setCSSVariables().then(async () => {
  const appImages = await theme.setImagesVariables();

  ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App appImages={appImages} />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
    // </React.StrictMode>
  );
});
