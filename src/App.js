import './App.css';
import ContactFrom from './components/contact/contact'


import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { Reacttable } from './components/table.js/reacttable';


function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<ContactFrom/>}></Route>
          <Route exact path="/details" element={<Reacttable />}></Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
