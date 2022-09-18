import React from 'react';
import './App.css';
import CustomizedTables from './Components/menu';
import AddCar from './Components/addCar';
import EditDetailsCar from './Components/editDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CustomizedTables />}/>
        <Route path="addCar" element={<AddCar/>}/>
        <Route path="editDetails" element={<EditDetailsCar/>}/>
      </Routes>
    </div>
  );
}

export default App;
