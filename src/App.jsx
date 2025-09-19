import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ac from "./pages/about/Ac";
import Ahome from "./components/Ahome";

const App = () => {
  return (
    <Router>
      <div>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Ahome />} />
          <Route path="/about" element={<Ac />} />
        </Routes>

        {/* Footer */}
        <h1 className="footer_title">
          © 2025 enny Yu & John Jaejoon Cho. All rights reserved.
        </h1>
      </div>
    </Router>
  );
};

export default App;
