
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './components/Details';
import List from './components/List';
import Form from './components/Form';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <div className='App-div center'>
        <Router>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/notes/:id" element={<Details />} />
            <Route path="/notes/new" element={<Form />} />
            <Route path="/notes/edit/:id" element={<Form />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
