import {Routes, Route, useNavigate, BrowserRouter as Router} from "react-router-dom"


import Login from './components/login';
import Home from './containers/home';

function App() {
  return (
    // <div className="App">
    //   Hello World
    // </div>
    <Router>
    <Routes>
      <Route path="/*" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </Router>
  );
}

export default App;
