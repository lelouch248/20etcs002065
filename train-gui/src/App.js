import './App.css';
import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TrainListPage from './components/Trainlist';
import SearchTrainPage from './components/SearchTrain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SearchTrainPage />} />
        <Route path="/trains" element={<TrainListPage />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;