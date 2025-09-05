import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeRegister from './pages/EmployeeRegister.jsx';
import EmployeeProfile from './pages/EmployeeProfile.jsx';
import Employee from './pages/Employee.jsx';
import Companies from './pages/Companies.jsx';
import CompanyRegisteration from './pages/CompanyRegisteration.jsx';
import Home from './pages/Home.jsx';
import GitRepo from './pages/GitRepo.jsx';
import Notes from './pages/Notes.jsx';
import CreateNote from './pages/CreateNote.jsx';
import Canva from './pages/Canva.jsx';
import Intro from './DSA/Graph/Lecture/Intro.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register-employee" element={<EmployeeRegister />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/new" element={<CompanyRegisteration />} />
        <Route path='/git-repo' element={<GitRepo/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/notes/new' element={<CreateNote/>}/>
        <Route path='/notes/canva' element={<Canva/>}/>
        <Route path='/notes/dsa/graph/intro' element={<Intro/>}/>
      </Routes>
    </Router>
  );
};

export default App;
