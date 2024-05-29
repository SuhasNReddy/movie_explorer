import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContentComponent from './components/ContentComponent';
import PopularComponent from './components/PopularComponent';


const App = () => {
  const [imdbId,setImdbId]=useState('tt6468322');
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar setImdbId={setImdbId} />
          
          <Routes>
              <Route path='/popular' element={<PopularComponent setImdbId={setImdbId} />} />
              <Route path='/' element={<ContentComponent imdbID={imdbId} />} />
          </Routes>
      </header>
      </div>
    </Router>
  );
}

export default App;
