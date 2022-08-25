import React from 'react';
import './App.css';
import Terminal from "./pages/Terminal/Terminal";
import { Route, Routes } from "react-router-dom";
import { TV } from "./pages/TV/TV";
import {Dashboard} from "./pages/Dashboard/Dashboard";
import {Login} from "./pages/Login/Login";
import {PrivateRoute} from "./components/PrivateRouter/PrivateRouter";
import {NotFound} from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="terminal/:id" element={<Terminal/>}/>
        <Route path="tv" element={<TV/>}/>
        <Route path="dashboard" element={
          <PrivateRoute>
              <Dashboard/>
          </PrivateRoute>
        }/>
        <Route path="login/:id" element={<Login/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
