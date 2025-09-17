import React from "react";
import "./App.css";
import TimezoneConverter from "./components/TimezoneConverter";
import MainBrandLogo from "./components/MainBrandLogo";

function App() {
  return (
    <>
      <MainBrandLogo
        logoSrc="/soft-logo.webp"
        mainDomain="soft.io.vn"
        altText="Logo Soft"
      />
      <TimezoneConverter />
    </>
  );
}

export default App;
