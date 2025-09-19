import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ac from "./pages/about/Ac";
import Ahome from "./components/Ahome";
import Allt from "./pages/travel/Allt";
import RSVPForm from "./pages/rsvp/RSVPForm";
import ScrollToTop from "./ScrollToTop";
import AdminApp from "./pages/rsvp/AdminApp";
import Nav from "./components/nav/Nav";

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <ScrollToTop />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Ahome />} />
          <Route path="/Wedding-details" element={<Ac />} />
          <Route path="/travel-stay" element={<Allt />} />
          <Route path="/rsvp" element={<RSVPForm />} />
          <Route path="/admin" element={<AdminApp />} />
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
