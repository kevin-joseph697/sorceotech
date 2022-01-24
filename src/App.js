import './App.css';
import ContactFrom from './components/contact/contact'


import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { Reacttable } from './components/table.js/reacttable';
// import AdmissionForm from './components/contact/test';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<ContactFrom/>}></Route>
          <Route exact path="/details" element={<Reacttable />}></Route>
          {/* <Route exact path='/test' element={<AdmissionForm />}></Route> */}
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
