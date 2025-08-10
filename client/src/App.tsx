import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calender from "./Pages/Calender";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calender />}></Route>
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
};

export default App;
