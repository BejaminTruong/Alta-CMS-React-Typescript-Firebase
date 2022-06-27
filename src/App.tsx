import React, { FC } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ticket from "./pages/Ticket";
import Layout from "./components/Layout";
import Invoice from "./pages/Invoice";
import Service from "./pages/Service";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/service" element={<Service />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
