import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calender from "./Pages/Calender";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calender/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
